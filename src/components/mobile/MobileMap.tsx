import React, { useState } from 'react';
import { useContingencia } from '../../context/ContingenciaContext';
import { OFFICIAL_HYDRAULIC_MAP_URL } from '../../data/mockData';
import { 
  MapPin, 
  Layers, 
  Eye, 
  Filter, 
  Maximize2, 
  AlertCircle,
  CheckCircle2,
  Clock,
  Compass
} from 'lucide-react';

export const MobileMap: React.FC = () => {
  const { reports, reservoirs, setSelectedReport, setHydraulicMapModalOpen } = useContingencia();
  const [showHydraulicOverlay, setShowHydraulicOverlay] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredReports = filterCategory === 'all' 
    ? reports 
    : reports.filter(r => r.category === filterCategory);

  return (
    <div className="space-y-3 pb-20 text-slate-800">
      
      {/* Header with layer controls */}
      <div className="flex items-center justify-between px-1">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Georreferenciación Managua
          </span>
          <h2 className="text-base font-bold text-slate-900">
            Mapa de Riesgos e Incidencias
          </h2>
        </div>

        <button
          onClick={() => setHydraulicMapModalOpen(true)}
          className="p-1.5 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 text-xs flex items-center gap-1 font-medium hover:bg-sky-100 transition-colors"
          title="Ver plano hidráulico a pantalla completa"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="text-[11px]">Plano Completo</span>
        </button>
      </div>

      {/* Map Viewport Container */}
      <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-slate-300 shadow-inner bg-slate-900">
        
        {/* Layer 1: Simulated Map / Hydraulic Map Overlay */}
        {showHydraulicOverlay ? (
          <div className="w-full h-full relative">
            <img 
              src={OFFICIAL_HYDRAULIC_MAP_URL} 
              alt="Mapa Hidráulico Oficial Managua" 
              className="w-full h-full object-cover opacity-90 filter contrast-125 brightness-95"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/75 text-white text-[10px] font-mono">
              Capa Oficial: Red Hidráulica y Cauces ALMA
            </div>
          </div>
        ) : (
          /* Vector Stylized Map of Managua with Lake Xolotlán shoreline and main stormwater channels */
          <div className="w-full h-full bg-[#1e293b] relative overflow-hidden">
            {/* Lake Xolotlán Top Water */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-sky-900/60 to-transparent border-b border-sky-500/20">
              <span className="absolute top-2 left-3 text-[10px] font-mono text-sky-400/80 tracking-widest uppercase">
                Lago Xolotlán (Managua)
              </span>
            </div>

            {/* Stylized Cauce Channels (Cyan Lines) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {/* Cauce Occidental */}
              <path d="M 60 280 Q 90 180 120 40" stroke="#0284c7" strokeWidth="3" fill="none" strokeDasharray="4 2" opacity="0.7" />
              {/* Cauce Oriental */}
              <path d="M 180 290 Q 200 160 220 50" stroke="#0284c7" strokeWidth="4" fill="none" opacity="0.8" />
              {/* Cauce 31 de Diciembre */}
              <path d="M 280 290 Q 270 170 290 60" stroke="#0284c7" strokeWidth="2.5" fill="none" opacity="0.6" />
            </svg>

            {/* Grid references */}
            <div className="absolute bottom-2 left-3 text-[9px] font-mono text-slate-400">
              12°08'N &middot; 86°15'W &middot; Managua
            </div>
          </div>
        )}

        {/* Reservoirs Pins on Map */}
        {reservoirs.map((res, i) => {
          const positions = [
            { top: '55%', left: '38%' }, // Los Gauchos
            { top: '38%', left: '44%' }, // Tiscapa
            { top: '75%', left: '68%' }  // Las Colinas
          ];
          const pos = positions[i] || { top: '50%', left: '50%' };
          return (
            <div
              key={res.id}
              style={{ top: pos.top, left: pos.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group cursor-pointer"
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-sky-500/30 animate-ping" />
                <div className="w-5 h-5 rounded-full bg-sky-500 border-2 border-white flex items-center justify-center text-[9px] font-bold text-white shadow-md">
                  💧
                </div>
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-1.5 py-0.5 rounded bg-slate-900/90 text-white text-[9px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {res.name} ({res.currentLevelMeters}m)
              </div>
            </div>
          );
        })}

        {/* Citizen Reports Pins */}
        {filteredReports.map((rep, idx) => {
          // Spread across map
          const topPercent = 25 + ((idx * 17) % 60);
          const leftPercent = 20 + ((idx * 23) % 65);

          const getStatusColor = (status: string) => {
            switch (status) {
              case 'resuelto': return 'bg-emerald-500';
              case 'en_atencion': return 'bg-sky-500';
              case 'confirmado': return 'bg-red-500';
              case 'en_verificacion': return 'bg-amber-500';
              default: return 'bg-orange-500';
            }
          };

          return (
            <div
              key={rep.id}
              onClick={() => setSelectedReport(rep)}
              style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer hover:scale-125 transition-transform"
              title={`${rep.title} (${rep.status})`}
            >
              <div className={`w-4 h-4 rounded-full ${getStatusColor(rep.status)} border-2 border-white shadow-md flex items-center justify-center`} />
            </div>
          );
        })}

        {/* Layer Switcher Pill in Map Corner */}
        <div className="absolute top-2 right-2 z-30">
          <button
            onClick={() => setShowHydraulicOverlay(!showHydraulicOverlay)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-medium flex items-center gap-1 shadow-md transition-all ${
              showHydraulicOverlay 
                ? 'bg-sky-600 text-white font-bold' 
                : 'bg-white/90 text-slate-800 backdrop-blur-xs'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>{showHydraulicOverlay ? 'Ocultar Red' : 'Capa Red Hidráulica'}</span>
          </button>
        </div>

        {/* Legend Overlay at Bottom */}
        <div className="absolute bottom-2 right-2 z-30 bg-black/75 backdrop-blur-xs px-2 py-1 rounded-lg text-[9px] text-white flex items-center gap-2">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Confirmado</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-500" /> En atención</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Resuelto</span>
        </div>

      </div>

      {/* Category Filter Horizontal Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-3 py-1 rounded-lg shrink-0 transition-colors ${
            filterCategory === 'all' 
              ? 'bg-slate-900 text-white font-semibold' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Todos ({reports.length})
        </button>
        <button
          onClick={() => setFilterCategory('calle_inundada')}
          className={`px-3 py-1 rounded-lg shrink-0 transition-colors ${
            filterCategory === 'calle_inundada' 
              ? 'bg-rose-600 text-white font-semibold' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Calles Inundadas
        </button>
        <button
          onClick={() => setFilterCategory('tragante_obstruido')}
          className={`px-3 py-1 rounded-lg shrink-0 transition-colors ${
            filterCategory === 'tragante_obstruido' 
              ? 'bg-rose-600 text-white font-semibold' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Tragantes
        </button>
        <button
          onClick={() => setFilterCategory('desborde_cauce')}
          className={`px-3 py-1 rounded-lg shrink-0 transition-colors ${
            filterCategory === 'desborde_cauce' 
              ? 'bg-rose-600 text-white font-semibold' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Cauces
        </button>
      </div>

      {/* Interactive List of Mapped Incidents */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider px-1">
          Puntos Registrados ({filteredReports.length})
        </h3>

        {filteredReports.map(rep => (
          <div
            key={rep.id}
            onClick={() => setSelectedReport(rep)}
            className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors cursor-pointer flex items-center justify-between gap-2"
          >
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-slate-400 block">
                {rep.folio} &middot; {rep.zone}
              </span>
              <h4 className="text-xs font-bold text-slate-900 truncate">
                {rep.title}
              </h4>
              <p className="text-[11px] text-slate-500 truncate">
                {rep.address}
              </p>
            </div>

            <div className="shrink-0 text-right">
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${
                rep.status === 'resuelto' ? 'bg-emerald-50 text-emerald-700' :
                rep.status === 'en_atencion' ? 'bg-sky-50 text-sky-700' :
                rep.status === 'confirmado' ? 'bg-red-50 text-red-700' :
                'bg-amber-50 text-amber-700'
              }`}>
                {rep.status}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
