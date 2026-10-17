import React, { useState, useEffect } from 'react';
import { useContingencia, MobileTab } from '../../context/ContingenciaContext';
import { MobileHome } from './MobileHome';
import { MobileSOS } from './MobileSOS';
import { MobileReportForm } from './MobileReportForm';
import { MobileAlerts } from './MobileAlerts';
import { MobileMap } from './MobileMap';
import { MobileEco } from './MobileEco';
import { 
  Home, 
  Map, 
  PlusCircle, 
  Bell, 
  Radio, 
  TreePine, 
  Wifi, 
  Battery, 
  LifeBuoy,
  Maximize,
  Minimize
} from 'lucide-react';
import { OFFICIAL_ISOTIPO_URL } from '../../data/mockData';

interface MobileDeviceSimulatorProps {
  forceEdgeToEdge?: boolean;
}

export const MobileDeviceSimulator: React.FC<MobileDeviceSimulatorProps> = ({ forceEdgeToEdge = false }) => {
  const { mobileTab, setMobileTab, activeSOS, selectedReservoir } = useContingencia();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const renderMobileBar = () => (
    <div className="h-12 px-3.5 bg-white/95 backdrop-blur-md border-b border-slate-200/90 flex items-center justify-between shrink-0 z-30 select-none shadow-2xs">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/90 p-1 flex items-center justify-center overflow-hidden shadow-2xs shrink-0">
          <img 
            src={OFFICIAL_ISOTIPO_URL} 
            alt="Isotipo Contingencia" 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <span className="font-display font-extrabold text-xs tracking-tight text-slate-900 leading-tight block">
            CONTENCIÓN
          </span>
          <span className="text-[10px] text-slate-500 font-medium leading-none block">
            {selectedReservoir.name.replace('Micropresa ', '')}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
          selectedReservoir.status === 'critico' 
            ? 'bg-red-50 text-red-700 border-red-200 animate-pulse' 
            : selectedReservoir.status === 'precaucion' 
              ? 'bg-amber-50 text-amber-700 border-amber-200' 
              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${
            selectedReservoir.status === 'critico' ? 'bg-red-500' : selectedReservoir.status === 'precaucion' ? 'bg-amber-500' : 'bg-emerald-500'
          }`} />
          <span>{selectedReservoir.status === 'critico' ? 'Crítico' : selectedReservoir.status === 'precaucion' ? 'Alerta' : 'Estable'}</span>
        </span>
      </div>
    </div>
  );

  const renderContent = () => (
    <>
      {mobileTab === 'home' && <MobileHome />}
      {mobileTab === 'map' && <MobileMap />}
      {mobileTab === 'report' && <MobileReportForm />}
      {mobileTab === 'sos' && <MobileSOS />}
      {mobileTab === 'alerts' && <MobileAlerts />}
      {mobileTab === 'eco' && <MobileEco />}
    </>
  );

  const renderBottomNav = () => (
    <nav className="sticky sm:absolute bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 flex items-center justify-around z-40 shadow-xs">
      {/* Tab 1: Home */}
      <button
        onClick={() => setMobileTab('home')}
        className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${
          mobileTab === 'home' ? 'text-rose-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Inicio</span>
      </button>

      {/* Tab 2: Map */}
      <button
        onClick={() => setMobileTab('map')}
        className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${
          mobileTab === 'map' ? 'text-rose-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Map className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Mapa</span>
      </button>

      {/* Tab 3: Central SOS Emergency Action Button */}
      <button
        onClick={() => setMobileTab('sos')}
        className={`relative -top-3 w-13 h-13 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
          activeSOS || mobileTab === 'sos'
            ? 'bg-red-600 text-white ring-4 ring-red-100 shadow-red-600/30'
            : 'bg-red-600 text-white shadow-red-600/20 hover:bg-red-700'
        }`}
        title="Asistencia de Emergencia SOS"
      >
        <LifeBuoy className="w-6 h-6 animate-spin-slow" />
        {activeSOS && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full animate-ping" />
        )}
      </button>

      {/* Tab 4: Report */}
      <button
        onClick={() => setMobileTab('report')}
        className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${
          mobileTab === 'report' ? 'text-rose-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <PlusCircle className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Reportar</span>
      </button>

      {/* Tab 5: Alerts / Eco */}
      <button
        onClick={() => setMobileTab('alerts')}
        className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${
          mobileTab === 'alerts' ? 'text-rose-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Bell className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Alertas</span>
      </button>
    </nav>
  );

  // If on actual mobile device or forced edge-to-edge, render full-bleed responsive layout
  if (isSmallScreen || forceEdgeToEdge) {
    return (
      <div className="w-full max-w-lg mx-auto bg-slate-50 min-h-[calc(100vh-5rem)] flex flex-col rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
        {renderMobileBar()}
        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-2">
          {renderContent()}
        </div>
        {renderBottomNav()}
      </div>
    );
  }

  // Desktop Simulator Phone Frame
  return (
    <div className="flex justify-center items-start w-full">
      <div className="relative w-full max-w-[390px] h-[820px] bg-slate-900 rounded-[44px] p-3 shadow-2xl ring-1 ring-slate-900/10 flex flex-col overflow-hidden">
        
        {/* Dynamic Island / Speaker Pill */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800 mr-2" />
          <div className="w-2 h-2 rounded-full bg-slate-900" />
        </div>

        {/* Screen Bezel Area */}
        <div className="relative w-full h-full bg-slate-50 rounded-[36px] overflow-hidden flex flex-col">
          
          {/* Mobile Status Bar */}
          <div className="h-10 pt-2 px-6 flex items-center justify-between text-slate-800 text-xs font-semibold select-none shrink-0 z-40 bg-white/70 backdrop-blur-md">
            <span className="font-mono text-[11px] font-bold">12:20</span>
            <div className="flex items-center gap-1.5 text-slate-700">
              <Wifi className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono font-bold">4G</span>
              <Battery className="w-4 h-4" />
            </div>
          </div>

          {/* Top Mobile App Bar with Official Isotipo */}
          {renderMobileBar()}

          {/* Scrollable Mobile Screen Content */}
          <div className="flex-1 overflow-y-auto px-4 pt-2">
            {renderContent()}
          </div>

          {/* Bottom App Navigation Bar */}
          {renderBottomNav()}

        </div>
      </div>
    </div>
  );
};
