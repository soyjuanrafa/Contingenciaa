import React from 'react';
import { useContingencia, ViewMode } from '../context/ContingenciaContext';
import { OFFICIAL_LOGO_URL } from '../data/mockData';
import { 
  Layers, 
  Smartphone, 
  LayoutDashboard, 
  SplitSquareVertical, 
  MapPin, 
  Activity, 
  AlertTriangle,
  Info,
  Download
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    reservoirs, 
    selectedReservoirId, 
    setSelectedReservoirId,
    setHydraulicMapModalOpen,
    setApkModalOpen,
    triggerSplashReload,
    alerts,
    reports
  } = useContingencia();

  const pendingCount = reports.filter(r => r.status === 'pendiente' || r.status === 'en_verificacion').length;
  const criticalCount = alerts.filter(a => a.severity === 'alta' || a.severity === 'critica').length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Brand Wordmark with Official Logo Definitivo */}
          <div className="flex items-center gap-3 shrink-0">
            <div 
              onClick={triggerSplashReload}
              className="relative flex items-center justify-center h-11 px-2 rounded-xl bg-white border border-slate-200/90 overflow-hidden shadow-xs cursor-pointer hover:scale-102 transition-transform"
              title="Click para ver la pantalla de carga inicial"
            >
              <img 
                src={OFFICIAL_LOGO_URL} 
                alt="Logo Contingencia Definitivo" 
                style={{ width: '70.225px', height: '61px' }}
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="hidden sm:block">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                Managua
              </span>
              <p className="text-[11px] text-slate-500 font-normal leading-tight">
                Prevención de Inundaciones &middot; Nicaragua
              </p>
            </div>
          </div>

          {/* Zone 2: Managua Sector Selector & Hydraulic Map Shortcut */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100/90 border border-slate-200 text-xs">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="text-slate-600 font-medium">Cuenca Monitoreada:</span>
              <select 
                value={selectedReservoirId}
                onChange={(e) => setSelectedReservoirId(e.target.value)}
                className="bg-transparent font-semibold text-slate-900 focus:outline-hidden cursor-pointer"
              >
                {reservoirs.map(res => (
                  <option key={res.id} value={res.id}>
                    {res.name} ({res.district})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setHydraulicMapModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 text-xs font-medium transition-colors"
              title="Abrir mapa de cauces y red hidráulica de Managua"
            >
              <Layers className="w-3.5 h-3.5 text-sky-600" />
              <span>Mapa Hidráulico Oficial</span>
            </button>
          </div>

          {/* Zone 3: View Mode Switcher & APK Install Button */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Download APK / PWA Install Button */}
            <button
              onClick={() => setApkModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-bold shadow-xs transition-all active:scale-95"
              title="Descargar e instalar en Android como APK / PWA"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Instalar APK</span>
              <span className="sm:hidden">APK</span>
            </button>

            <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-medium">
              <button
                onClick={() => setActiveView('hybrid')}
                className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeView === 'hybrid'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Vista interactiva dual: Simulador móvil ciudadano + Centro de mando municipal"
              >
                <SplitSquareVertical className="w-3.5 h-3.5 text-rose-600" />
                <span className="hidden lg:inline">Vista Híbrida</span>
                <span className="lg:hidden">Dual</span>
              </button>

              <button
                onClick={() => setActiveView('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeView === 'mobile'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Simulador de aplicación móvil ciudadana con botón SOS y reportes"
              >
                <Smartphone className="w-3.5 h-3.5 text-indigo-600" />
                <span>Móvil</span>
              </button>

              <button
                onClick={() => setActiveView('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeView === 'admin'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Consola táctica para brigadas municipales y COMUPRED"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">Centro de Mando</span>
                <span className="sm:hidden">Admin</span>
              </button>
            </div>

            {/* Quick alert badge */}
            {pendingCount > 0 && (
              <div 
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-medium"
                title={`${pendingCount} reportes ciudadanos pendientes de revisión municipal`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>{pendingCount}</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
