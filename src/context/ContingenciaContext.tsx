import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CitizenReport, 
  ReservoirSite, 
  AlertNotice, 
  GreenInfraSite, 
  EmergencySOS, 
  ReportStatus, 
  ReportCategory, 
  SolutionType 
} from '../types';
import { 
  INITIAL_RESERVOIRS, 
  INITIAL_REPORTS, 
  INITIAL_ALERTS, 
  INITIAL_GREEN_INFRA 
} from '../data/mockData';
import { db } from '../lib/firebase.ts';
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  onSnapshot 
} from 'firebase/firestore';

export type ViewMode = 'hybrid' | 'mobile' | 'admin';
export type MobileTab = 'home' | 'map' | 'report' | 'sos' | 'alerts' | 'eco';

interface ContingenciaContextType {
  // Navigation & Viewport Modes
  activeView: ViewMode;
  setActiveView: (view: ViewMode) => void;
  mobileTab: MobileTab;
  setMobileTab: (tab: MobileTab) => void;

  // Reservoirs & Telemetry
  reservoirs: ReservoirSite[];
  selectedReservoirId: string;
  setSelectedReservoirId: (id: string) => void;
  selectedReservoir: ReservoirSite;
  isSimulatingRain: boolean;
  setIsSimulatingRain: (val: boolean) => void;
  triggerSimulatedRain: (reservoirId: string, deltaMeters: number) => void;
  triggerDrain: (reservoirId: string, deltaMeters: number) => void;
  resetReservoirLevels: () => void;

  // Citizen Reports
  reports: CitizenReport[];
  selectedReport: CitizenReport | null;
  setSelectedReport: (report: CitizenReport | null) => void;
  addReport: (reportData: {
    category: ReportCategory;
    title: string;
    description: string;
    zone: string;
    neighborhood: string;
    address: string;
    coordinates?: { lat: number; lng: number };
    photoUrl?: string;
    reporterName: string;
    reporterPhone: string;
    waterDepthCm?: number;
    priority?: 'baja' | 'media' | 'alta' | 'urgente';
  }) => CitizenReport;
  updateReportStatus: (
    reportId: string, 
    newStatus: ReportStatus, 
    author: string, 
    role: string, 
    note: string
  ) => void;

  // Alerts & Warnings
  alerts: AlertNotice[];
  addAlert: (alert: Omit<AlertNotice, 'id' | 'timestamp'>) => void;

  // Green Infrastructure
  greenInfraSites: GreenInfraSite[];
  selectedGreenSite: GreenInfraSite | null;
  setSelectedGreenSite: (site: GreenInfraSite | null) => void;
  addGreenInfraSite: (siteData: Omit<GreenInfraSite, 'id' | 'linkedReportsCount'>) => void;

  // SOS Emergency
  activeSOS: EmergencySOS | null;
  sosCountdown: number;
  startSOS: (data: { userName: string; phone: string; address: string; neighborhood: string; emergencyType: string }) => void;
  cancelSOS: () => void;

  // Hydraulic Map Modal
  isHydraulicMapModalOpen: boolean;
  setHydraulicMapModalOpen: (open: boolean) => void;

  // APK & Android Install Modal
  isApkModalOpen: boolean;
  setApkModalOpen: (open: boolean) => void;

  // Splash Screen Trigger
  showSplash: boolean;
  setShowSplash: (show: boolean) => void;
  triggerSplashReload: () => void;

  // Offline queue
  offlineQueueCount: number;
}

const ContingenciaContext = createContext<ContingenciaContextType | undefined>(undefined);

export const ContingenciaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auto-detect mobile devices for responsive view
  const [activeView, setActiveView] = useState<ViewMode>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      return 'mobile';
    }
    return 'hybrid';
  });

  const [mobileTab, setMobileTab] = useState<MobileTab>('home');
  const [reservoirs, setReservoirs] = useState<ReservoirSite[]>(INITIAL_RESERVOIRS);
  const [selectedReservoirId, setSelectedReservoirId] = useState<string>('res-gauchos');
  const [isSimulatingRain, setIsSimulatingRain] = useState<boolean>(false);

  // Offline-first Reports from localStorage
  const [reports, setReports] = useState<CitizenReport[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('contingencia_reports_v1');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return INITIAL_REPORTS;
  });

  const [selectedReport, setSelectedReport] = useState<CitizenReport | null>(null);
  const [alerts, setAlerts] = useState<AlertNotice[]>(INITIAL_ALERTS);
  const [greenInfraSites, setGreenInfraSites] = useState<GreenInfraSite[]>(INITIAL_GREEN_INFRA);
  const [selectedGreenSite, setSelectedGreenSite] = useState<GreenInfraSite | null>(null);
  const [activeSOS, setActiveSOS] = useState<EmergencySOS | null>(null);
  const [sosCountdown, setSosCountdown] = useState<number>(30);
  const [isHydraulicMapModalOpen, setHydraulicMapModalOpen] = useState<boolean>(false);
  const [isApkModalOpen, setApkModalOpen] = useState<boolean>(false);
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [offlineQueueCount, setOfflineQueueCount] = useState<number>(0);

  // Sync reports to localStorage for offline persistence
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('contingencia_reports_v1', JSON.stringify(reports));
      } catch (e) {
        // ignore
      }
    }
  }, [reports]);

  // Real-time Firestore synchronization for reports
  useEffect(() => {
    let unsubscribe: () => void = () => {};
    try {
      const reportsCol = collection(db, 'reports');
      unsubscribe = onSnapshot(reportsCol, (snapshot) => {
        if (!snapshot.empty) {
          const remoteReports: CitizenReport[] = [];
          snapshot.forEach(docSnap => {
            remoteReports.push(docSnap.data() as CitizenReport);
          });
          setReports(prev => {
            const map = new Map<string, CitizenReport>();
            remoteReports.forEach(r => map.set(r.id, r));
            prev.forEach(r => {
              if (!map.has(r.id)) map.set(r.id, r);
            });
            return Array.from(map.values()).sort((a, b) => b.folio.localeCompare(a.folio));
          });
        }
      }, (error) => {
        console.warn('Firestore offline notice:', error);
      });
    } catch (err) {
      console.warn('Firestore fallback to local store:', err);
    }
    return () => unsubscribe();
  }, []);

  const triggerSplashReload = () => {
    setShowSplash(true);
  };

  // Selected reservoir instance
  const selectedReservoir = reservoirs.find(r => r.id === selectedReservoirId) || reservoirs[0];

  // Real-time gentle telemetry pulse effect for ESP32
  useEffect(() => {
    const interval = setInterval(() => {
      setReservoirs(prev => prev.map(res => {
        // Natural micro-fluctuation (+/- 0.02m) or rain accumulation
        const jitter = (Math.random() - 0.48) * 0.03;
        const rainBoost = isSimulatingRain ? 0.08 : 0;
        let newLevel = Math.max(0.5, Math.min(res.maxDepthMeters * 0.98, res.currentLevelMeters + jitter + rainBoost));
        newLevel = Math.round(newLevel * 100) / 100;
        const capacityPercentage = Math.round((newLevel / res.maxDepthMeters) * 1000) / 10;
        
        let status: 'normal' | 'precaucion' | 'critico' = 'normal';
        if (newLevel >= res.criticalThresholdMeters) status = 'critico';
        else if (newLevel >= res.cautionThresholdMeters) status = 'precaucion';

        // Update readings history
        const nowStr = new Date().toLocaleTimeString('es-NI', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const updatedHistory = [...res.readingsHistory.slice(-9), {
          timestamp: nowStr,
          levelMeters: newLevel,
          capacityPercentage,
          rateOfChangeMph: rainBoost > 0 ? 0.48 : Math.round((jitter * 20) * 100) / 100
        }];

        return {
          ...res,
          currentLevelMeters: newLevel,
          capacityPercentage,
          status,
          readingsHistory: updatedHistory,
          esp32Device: {
            ...res.esp32Device,
            lastPing: 'Hace 5 segundos'
          }
        };
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, [isSimulatingRain]);

  // SOS Countdown Timer when active
  useEffect(() => {
    let timer: any = null;
    if (activeSOS && activeSOS.status === 'buscando_cuadrilla') {
      timer = setInterval(() => {
        setSosCountdown(prev => {
          if (prev <= 1) {
            // Assign emergency brigade
            setActiveSOS(current => current ? {
              ...current,
              status: 'cuadrilla_en_camino',
              assignedBrigade: 'Brigada de Reacción Rápida COMUPRED D-I',
              responderName: 'Oficial Rigoberto López & Cuadrilla de Achique',
              etaMinutes: 4
            } : null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeSOS]);

  // Manual rain burst
  const triggerSimulatedRain = (reservoirId: string, deltaMeters: number) => {
    setReservoirs(prev => prev.map(res => {
      if (res.id !== reservoirId) return res;
      const newLevel = Math.min(res.maxDepthMeters * 0.98, Math.round((res.currentLevelMeters + deltaMeters) * 100) / 100);
      const capacityPercentage = Math.round((newLevel / res.maxDepthMeters) * 1000) / 10;
      let status: 'normal' | 'precaucion' | 'critico' = 'normal';
      if (newLevel >= res.criticalThresholdMeters) status = 'critico';
      else if (newLevel >= res.cautionThresholdMeters) status = 'precaucion';

      return {
        ...res,
        currentLevelMeters: newLevel,
        capacityPercentage,
        status,
        readingsHistory: [...res.readingsHistory.slice(-9), {
          timestamp: new Date().toLocaleTimeString('es-NI', { hour: '2-digit', minute: '2-digit' }),
          levelMeters: newLevel,
          capacityPercentage,
          rateOfChangeMph: 0.85
        }]
      };
    }));

    // If critical, trigger a platform preventive alert
    if (deltaMeters >= 1.5) {
      addAlert({
        title: `Aviso Preventivo: Incremento acelerado detectado en ${selectedReservoir.name}`,
        origin: 'plataforma_preventiva',
        entity: 'Plataforma Contingencia (Sensor ESP32)',
        severity: 'alta',
        message: `El nivel ha experimentado un incremento súbito de +${deltaMeters}m por escorrentía intensa. Se sugiere monitorear cauces de salida hacia la cuenca baja.`,
        zone: selectedReservoir.locationDescription,
        technicalRule: `Criterio técnico de umbral superado (+${deltaMeters}m en <10min).`
      });
    }
  };

  // Manual drainage
  const triggerDrain = (reservoirId: string, deltaMeters: number) => {
    setReservoirs(prev => prev.map(res => {
      if (res.id !== reservoirId) return res;
      const newLevel = Math.max(0.8, Math.round((res.currentLevelMeters - deltaMeters) * 100) / 100);
      const capacityPercentage = Math.round((newLevel / res.maxDepthMeters) * 1000) / 10;
      let status: 'normal' | 'precaucion' | 'critico' = 'normal';
      if (newLevel >= res.criticalThresholdMeters) status = 'critico';
      else if (newLevel >= res.cautionThresholdMeters) status = 'precaucion';

      return {
        ...res,
        currentLevelMeters: newLevel,
        capacityPercentage,
        status,
        readingsHistory: [...res.readingsHistory.slice(-9), {
          timestamp: new Date().toLocaleTimeString('es-NI', { hour: '2-digit', minute: '2-digit' }),
          levelMeters: newLevel,
          capacityPercentage,
          rateOfChangeMph: -0.65
        }]
      };
    }));
  };

  const resetReservoirLevels = () => {
    setReservoirs(INITIAL_RESERVOIRS);
    setIsSimulatingRain(false);
  };

  // Add citizen report
  const addReport = (reportData: {
    category: ReportCategory;
    title: string;
    description: string;
    zone: string;
    neighborhood: string;
    address: string;
    coordinates?: { lat: number; lng: number };
    photoUrl?: string;
    reporterName: string;
    reporterPhone: string;
    waterDepthCm?: number;
    priority?: 'baja' | 'media' | 'alta' | 'urgente';
  }): CitizenReport => {
    const nextNum = reports.length + 85;
    const folio = `CTG-2026-${String(nextNum).padStart(3, '0')}`;
    const newReport: CitizenReport = {
      id: `rep-${Date.now()}`,
      folio,
      category: reportData.category,
      title: reportData.title,
      description: reportData.description,
      zone: reportData.zone,
      neighborhood: reportData.neighborhood,
      address: reportData.address,
      coordinates: reportData.coordinates || { 
        lat: 12.1300 + (Math.random() - 0.5) * 0.04, 
        lng: -86.2600 + (Math.random() - 0.5) * 0.04 
      },
      photoUrl: reportData.photoUrl || 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
      timestamp: 'Ahora mismo',
      status: 'pendiente',
      priority: reportData.priority || 'media',
      reporterName: reportData.reporterName,
      reporterPhone: reportData.reporterPhone,
      waterDepthCm: reportData.waterDepthCm || 20,
      actionLog: [
        {
          id: `act-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString('es-NI', { hour: '2-digit', minute: '2-digit' }),
          author: reportData.reporterName,
          role: 'Ciudadano Reportante',
          note: 'Reporte ingresado desde la aplicación ciudadana de Contingencia.',
          fromStatus: undefined,
          toStatus: 'pendiente'
        }
      ]
    };

    setReports(prev => [newReport, ...prev]);

    // Save to Firestore asynchronously
    try {
      setDoc(doc(db, 'reports', newReport.id), newReport).catch((err) => {
        console.warn('Report stored locally (offline mode):', err);
      });
    } catch (e) {
      // offline fallback handled by localStorage
    }

    return newReport;
  };

  // Update status (The 5 exact states from PDF)
  const updateReportStatus = (
    reportId: string, 
    newStatus: ReportStatus, 
    author: string, 
    role: string, 
    note: string
  ) => {
    setReports(prev => prev.map(rep => {
      if (rep.id !== reportId) return rep;
      const newAction: any = {
        id: `act-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString('es-NI', { hour: '2-digit', minute: '2-digit' }),
        author,
        role,
        note,
        fromStatus: rep.status,
        toStatus: newStatus
      };
      const updated = {
        ...rep,
        status: newStatus,
        actionLog: [newAction, ...rep.actionLog]
      };
      if (selectedReport?.id === reportId) {
        setSelectedReport(updated);
      }

      // Update in Firestore asynchronously
      try {
        updateDoc(doc(db, 'reports', reportId), {
          status: newStatus,
          actionLog: updated.actionLog
        }).catch((err) => {
          console.warn('Status update stored locally (offline mode):', err);
        });
      } catch (e) {
        // offline fallback
      }

      return updated;
    }));
  };

  const addAlert = (alertData: Omit<AlertNotice, 'id' | 'timestamp'>) => {
    const newAlert: AlertNotice = {
      ...alertData,
      id: `alt-${Date.now()}`,
      timestamp: 'Hace unos momentos'
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const addGreenInfraSite = (siteData: Omit<GreenInfraSite, 'id' | 'linkedReportsCount'>) => {
    const newSite: GreenInfraSite = {
      ...siteData,
      id: `gi-${Date.now()}`,
      linkedReportsCount: 1
    };
    setGreenInfraSites(prev => [newSite, ...prev]);
  };

  const startSOS = (data: { userName: string; phone: string; address: string; neighborhood: string; emergencyType: string }) => {
    setSosCountdown(30);
    setActiveSOS({
      id: `sos-${Date.now()}`,
      userName: data.userName,
      phone: data.phone,
      address: data.address,
      neighborhood: data.neighborhood,
      emergencyType: data.emergencyType,
      coordinates: { lat: 12.1325, lng: -86.2640 },
      timestamp: 'Ahora mismo',
      status: 'buscando_cuadrilla'
    });
  };

  const cancelSOS = () => {
    setActiveSOS(null);
    setSosCountdown(30);
  };

  return (
    <ContingenciaContext.Provider value={{
      activeView,
      setActiveView,
      mobileTab,
      setMobileTab,
      reservoirs,
      selectedReservoirId,
      setSelectedReservoirId,
      selectedReservoir,
      isSimulatingRain,
      setIsSimulatingRain,
      triggerSimulatedRain,
      triggerDrain,
      resetReservoirLevels,
      reports,
      selectedReport,
      setSelectedReport,
      addReport,
      updateReportStatus,
      alerts,
      addAlert,
      greenInfraSites,
      selectedGreenSite,
      setSelectedGreenSite,
      addGreenInfraSite,
      activeSOS,
      sosCountdown,
      startSOS,
      cancelSOS,
      isHydraulicMapModalOpen,
      setHydraulicMapModalOpen,
      isApkModalOpen,
      setApkModalOpen,
      showSplash,
      setShowSplash,
      triggerSplashReload,
      offlineQueueCount
    }}>
      {children}
    </ContingenciaContext.Provider>
  );
};

export const useContingencia = () => {
  const context = useContext(ContingenciaContext);
  if (!context) {
    throw new Error('useContingencia must be used within a ContingenciaProvider');
  }
  return context;
};
