import React from 'react';
import { useContingencia } from '../../context/ContingenciaContext';
import { 
  CloudRain, 
  Droplets, 
  AlertTriangle, 
  ShieldCheck, 
  ChevronRight, 
  PlusCircle, 
  LifeBuoy, 
  MapPin, 
  Compass,
  ArrowUpRight,
  Sparkles,
  TreePine
} from 'lucide-react';

import { OFFICIAL_ISOTIPO_URL } from '../../data/mockData';

export const MobileHome: React.FC = () => {
  const { 
    selectedReservoir, 
    setMobileTab, 
    reports, 
    alerts,
    setSelectedReport
  } = useContingencia();

  const activeAlert = alerts[0];
  const recentReports = reports.slice(0, 3);

  // Status color helpers
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critico':
        return { text: 'Nivel Crítico', bg: 'bg-red-50 text-red-700 border-red-200' };
      case 'precaucion':
        return { text: 'Precaución', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
      default:
        return { text: 'Nivel Estable', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    }
  };

  const statusBadge = getStatusBadge(selectedReservoir.status);

  // Stroke offset for circular progress ring
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (selectedReservoir.capacityPercentage / 100) * circumference;

  return (
    <div className="space-y-4 pb-20 text-slate-800">
      
      {/* Welcome & Location Header (Inspired by Sketch 4) */}
      <div className="bg-gradient-to-b from-rose-50/70 to-white p-4 rounded-2xl border border-rose-100/80 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-rose-700 uppercase tracking-wider">
              Monitoreo Comunitario Managua
            </span>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Hola, Habitante
            </h2>
          </div>
          <div className="w-10 h-10 rounded-full bg-white border border-rose-200 p-1 flex items-center justify-center shadow-xs overflow-hidden">
            <img 
              src={OFFICIAL_ISOTIPO_URL} 
              alt="Isotipo Contingencia" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-600 bg-white/90 py-1.5 px-3 rounded-xl border border-slate-200/70">
          <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
          <span className="truncate font-medium">{selectedReservoir.name} &middot; {selectedReservoir.district}</span>
        </div>
      </div>

      {/* Condición en tu Entorno: Cards inspiradas en boceto 4 */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Condición en tu Entorno
          </h3>
          <span className="text-[11px] text-slate-500 font-mono tabular-nums">
            En vivo
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Card 1: Nivel de Reservorio Pluvial */}
          <div className="p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500">Reservorio</span>
              <Droplets className="w-4 h-4 text-sky-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                {selectedReservoir.currentLevelMeters}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ {selectedReservoir.maxDepthMeters}m</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <span className={`inline-block w-2 h-2 rounded-full ${selectedReservoir.status === 'critico' ? 'bg-red-500 animate-pulse' : selectedReservoir.status === 'precaucion' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
              <span className="text-[10px] font-medium text-slate-600">
                {statusBadge.text} ({selectedReservoir.capacityPercentage}%)
              </span>
            </div>
          </div>

          {/* Card 2: Clima y Lluvias (INETER) */}
          <div className="p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500">Pronóstico</span>
              <CloudRain className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-lg font-bold text-slate-900">
                Lluvias
              </span>
              <span className="text-xs text-indigo-600 font-semibold">Tarde</span>
            </div>
            <div className="mt-2 text-[10px] text-slate-500 leading-tight">
              Onda Tropical N° 28 &middot; Temp. 28°C
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Button Inspired by Sketches: Emergency Support / SOS Quick Access */}
      <div 
        onClick={() => setMobileTab('sos')}
        className="p-4 bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl text-white shadow-md shadow-red-600/15 cursor-pointer hover:opacity-95 transition-all"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <LifeBuoy className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                <span>¿Estás en emergencia por lluvia?</span>
              </div>
              <p className="text-[11px] text-red-100 leading-tight mt-0.5">
                Solicita cuadrilla de auxilio o brigada COMUPRED
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/80 shrink-0" />
        </div>
      </div>

      {/* Two Essential Fast Action Tiles (Inspired by Sketch 3) */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={() => setMobileTab('report')}
          className="p-3.5 bg-emerald-50/70 hover:bg-emerald-100/60 rounded-2xl border border-emerald-200/80 text-left transition-colors flex flex-col justify-between h-28 group"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-xs text-emerald-950 block group-hover:text-emerald-800">
              Reportar Incidencia
            </span>
            <span className="text-[10px] text-emerald-700 block mt-0.5">
              Tragantes, calles o basura
            </span>
          </div>
        </button>

        <button
          onClick={() => setMobileTab('eco')}
          className="p-3.5 bg-sky-50/70 hover:bg-sky-100/60 rounded-2xl border border-sky-200/80 text-left transition-colors flex flex-col justify-between h-28 group"
        >
          <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-xs">
            <TreePine className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-xs text-sky-950 block group-hover:text-sky-800">
              Infraestructura Verde
            </span>
            <span className="text-[10px] text-sky-700 block mt-0.5">
              Jardines de lluvia barriales
            </span>
          </div>
        </button>
      </div>

      {/* Active Warning / Alert Notice Card */}
      {activeAlert && (
        <div 
          onClick={() => setMobileTab('alerts')}
          className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200/80 cursor-pointer hover:bg-amber-100/60 transition-colors"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                  {activeAlert.origin === 'oficial_autoridades' ? 'Aviso Oficial' : 'Aviso Técnico'}
                </span>
                <span className="text-[10px] text-amber-700 font-mono">
                  {activeAlert.timestamp}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-900 mt-0.5 truncate">
                {activeAlert.title}
              </p>
              <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                {activeAlert.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Community Incident Reports */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Reportes en tu Sector ({recentReports.length})
          </h3>
          <button 
            onClick={() => setMobileTab('map')}
            className="text-[11px] font-medium text-rose-600 hover:text-rose-700"
          >
            Ver en mapa &rarr;
          </button>
        </div>

        <div className="space-y-2">
          {recentReports.map(rep => (
            <div 
              key={rep.id}
              onClick={() => setSelectedReport(rep)}
              className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors cursor-pointer flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                  <img 
                    src={rep.photoUrl} 
                    alt={rep.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-slate-900 truncate">
                    {rep.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                    <span>{rep.neighborhood}</span>
                    <span>&middot;</span>
                    <span className="font-mono">{rep.timestamp}</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${
                  rep.status === 'resuelto' ? 'bg-emerald-50 text-emerald-700' :
                  rep.status === 'en_atencion' ? 'bg-sky-50 text-sky-700' :
                  rep.status === 'confirmado' ? 'bg-indigo-50 text-indigo-700' :
                  'bg-amber-50 text-amber-700'
                }`}>
                  {rep.status === 'resuelto' ? 'Resuelto' :
                   rep.status === 'en_atencion' ? 'En atención' :
                   rep.status === 'confirmado' ? 'Confirmado' : 'Revisión'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
