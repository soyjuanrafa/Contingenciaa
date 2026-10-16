export type ReportCategory = 
  | 'calle_inundada' 
  | 'tragante_obstruido' 
  | 'acumulacion_basura' 
  | 'aumento_nivel' 
  | 'dano_infraestructura' 
  | 'desborde_cauce';

export type ReportStatus = 
  | 'pendiente'        // 1. Pendiente de revisión
  | 'en_verificacion'  // 2. En verificación
  | 'confirmado'       // 3. Confirmado
  | 'en_atencion'      // 4. En atención
  | 'resuelto';        // 5. Resuelto

export interface ActionLogItem {
  id: string;
  timestamp: string;
  author: string;
  role: string;
  note: string;
  fromStatus?: ReportStatus;
  toStatus?: ReportStatus;
}

export interface CitizenReport {
  id: string;
  folio: string;
  category: ReportCategory;
  title: string;
  description: string;
  zone: string;
  neighborhood: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  photoUrl: string;
  timestamp: string;
  status: ReportStatus;
  priority: 'baja' | 'media' | 'alta' | 'urgente';
  reporterName: string;
  reporterPhone: string;
  waterDepthCm?: number;
  actionLog: ActionLogItem[];
}

export interface ESP32Device {
  deviceId: string;
  macAddress: string;
  batteryPercentage: number;
  wifiSignalDbm: number;
  firmwareVersion: string;
  lastPing: string;
  sensorType: 'Ultrasónico JSN-SR04T' | 'Presión Hidrostática Submersible';
  isSimulated: boolean;
}

export interface LevelReading {
  timestamp: string;
  levelMeters: number;
  capacityPercentage: number;
  rateOfChangeMph: number; // m/h
}

export interface ReservoirSite {
  id: string;
  name: string;
  district: string;
  locationDescription: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  maxDepthMeters: number;
  normalThresholdMeters: number;
  cautionThresholdMeters: number;
  criticalThresholdMeters: number;
  currentLevelMeters: number;
  capacityPercentage: number;
  status: 'normal' | 'precaucion' | 'critico';
  esp32Device: ESP32Device;
  readingsHistory: LevelReading[];
}

export interface AlertNotice {
  id: string;
  title: string;
  origin: 'plataforma_preventiva' | 'oficial_autoridades';
  entity: 'Plataforma Contingencia (Sensor ESP32)' | 'SINAPRED' | 'INETER' | 'Alcaldía de Managua (ALMA)' | 'COMUPRED Managua';
  severity: 'informativa' | 'moderada' | 'alta' | 'critica';
  message: string;
  zone: string;
  timestamp: string;
  officialSourceUrl?: string;
  technicalRule?: string;
}

export type SolutionType = 
  | 'jardin_lluvia' 
  | 'superficie_permeable' 
  | 'infiltracion_vegetada' 
  | 'recuperacion_verde';

export interface GreenInfraSite {
  id: string;
  name: string;
  solutionType: SolutionType;
  district: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  estimatedRunoffReduction: string;
  suitableAreaM2: number;
  status: 'en_estudio' | 'prioridad_alta' | 'validado_tecnico';
  description: string;
  soilType: string;
  benefits: string[];
  linkedReportsCount: number;
  imageUrl: string;
}

export interface EmergencySOS {
  id: string;
  userName: string;
  phone: string;
  neighborhood: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  timestamp: string;
  status: 'buscando_cuadrilla' | 'cuadrilla_en_camino' | 'en_atencion' | 'finalizado';
  assignedBrigade?: string;
  responderName?: string;
  etaMinutes?: number;
  emergencyType: string;
}
