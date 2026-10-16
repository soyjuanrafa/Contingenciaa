import React from 'react';
import { ContingenciaProvider, useContingencia } from './context/ContingenciaContext';
import { Header } from './components/Header';
import { MobileDeviceSimulator } from './components/mobile/MobileDeviceSimulator';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ReportDetailModal } from './components/modals/ReportDetailModal';
import { HydraulicMapModal } from './components/modals/HydraulicMapModal';
import { GreenSiteModal } from './components/modals/GreenSiteModal';
import { ApkDownloadModal } from './components/modals/ApkDownloadModal';
import { SplashScreen } from './components/SplashScreen';
import { OfflineBanner } from './components/OfflineBanner';
import { 
  ArrowLeftRight, 
  Smartphone, 
  LayoutDashboard, 
  Info, 
  ShieldCheck,
  LifeBuoy
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    isApkModalOpen, 
    setApkModalOpen,
    showSplash,
    setShowSplash
  } = useContingencia();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 text-slate-900">
      
      {/* Animated Splash Screen with Official Logo */}
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}

      {/* Top Bar */}
      <Header />

      {/* Connectivity Banner */}
      <OfflineBanner />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* View Mode 1: Hybrid Dual View (Synchronized Mobile Citizen App + Municipal Command Center) */}
        {activeView === 'hybrid' && (
          <div className="space-y-6">
            
            {/* Contextual Explanatory Banner */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-slate-700">
                  <strong>Entorno Híbrido Sincronizado en Tiempo Real:</strong> Envía un reporte o pulsa SOS en el móvil de la izquierda y observa cómo impacta de inmediato en el Centro de Mando Municipal de la derecha.
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveView('mobile')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors"
                >
                  Expandir Móvil
                </button>
                <button
                  onClick={() => setActiveView('admin')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors"
                >
                  Expandir Centro de Mando
                </button>
              </div>
            </div>

            {/* Split Screen Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Ergonomic Smartphone Simulator (4 cols on desktop) */}
              <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-center">
                <div className="w-full mb-3 flex items-center justify-between px-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-rose-600" />
                    <span>App Ciudadana (Boceto Móvil)</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Interactivo &middot; Touch
                  </span>
                </div>
                <MobileDeviceSimulator />
              </div>

              {/* Right Column: Municipal Command Center (7-8 cols on desktop) */}
              <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                    <span>Centro de Mando Municipal (ALMA / COMUPRED)</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Consola de Operaciones
                  </span>
                </div>
                <AdminDashboard />
              </div>

            </div>

          </div>
        )}

        {/* View Mode 2: Pure Mobile Application View */}
        {activeView === 'mobile' && (
          <div className="py-4 flex flex-col items-center">
            <div className="max-w-md w-full mb-4 flex items-center justify-between px-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-rose-600" />
                <span>Simulador de Aplicación Móvil Ciudadana</span>
              </span>
              <button
                onClick={() => setActiveView('hybrid')}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700"
              >
                Volver a Vista Dual &rarr;
              </button>
            </div>
            <MobileDeviceSimulator />
          </div>
        )}

        {/* View Mode 3: Pure Municipal Command Center View */}
        {activeView === 'admin' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-display text-slate-900">
                  Centro de Mando y Gestión del Riesgo Hídrico
                </h2>
                <p className="text-xs text-slate-500">
                  Panel institucional de monitoreo telemétrico, triaje de incidencias ciudadanas e infraestructura verde.
                </p>
              </div>
              <button
                onClick={() => setActiveView('hybrid')}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 shadow-xs"
              >
                Volver a Vista Dual
              </button>
            </div>
            <AdminDashboard />
          </div>
        )}

      </main>

      {/* Global Modals */}
      <ReportDetailModal />
      <HydraulicMapModal />
      <GreenSiteModal />
      <ApkDownloadModal isOpen={isApkModalOpen} onClose={() => setApkModalOpen(false)} />

      {/* Institutional Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="font-semibold text-slate-700">
            CONTINGENCIA &middot; Plataforma Inteligente para la Prevención de Inundaciones en Nicaragua
          </p>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Iniciativa tecnológica para conectar la telemetría hídrica de reservorios, los reportes comunitarios y la planificación de infraestructura verde en Managua. Respeta las competencias de <strong>SINAPRED</strong>, <strong>INETER</strong> y la <strong>Alcaldía de Managua</strong>, diferenciando avisos preventivos generados por sensores de las alertas oficiales emitidas por autoridades.
          </p>
          <p className="text-[10px] text-slate-400 font-mono pt-1">
            Prototipo Funcional Etapa 1 &middot; Managua, Nicaragua &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <ContingenciaProvider>
      <MainLayout />
    </ContingenciaProvider>
  );
}
