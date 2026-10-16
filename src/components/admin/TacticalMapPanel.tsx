import React, { useState } from 'react';
import { useContingencia } from '../../context/ContingenciaContext';
import { OFFICIAL_HYDRAULIC_MAP_URL } from '../../data/mockData';
import { 
  Layers, 
  MapPin, 
  Maximize2, 
  Filter, 
  Flame, 
  Droplets,
  Eye,
  Info
} from 'lucide-react';

export const TacticalMapPanel: React.FC = () => {
  const { 
    reports, 
    reservoirs, 
    setSelectedReport, 
    setHydraulicMapModalOpen 
  } = useContingencia();

  const [overlayActive, setOverlayActive] = useState(false);
  const [selectedPin, setSelectedPin] = useState<any | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
      
      {/* Header with Layer Switcher & Fullscreen Trigger */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-sm text-slate-900">
              Visualizador Cartográfico Táctico de Managua
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 font-mono font-medium border border-sky-200">
              Capa Georreferenciada
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitoreo espacial de cauces, micropresas de retención e incidencias activas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOverlayActive(!overlayActive)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
              overlayActive 
                ? 'bg-sky-600 text-white' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{overlayActive ? 'Capa Hidráulica: Activa' : 'Superponer Mapa Hidráulico'}</span>
          </button>

          <button
            onClick={() => setHydraulicMapModalOpen(true)}
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
            title="Ver Plano Hidráulico a Pantalla Completa"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden border border-slate-300 bg-slate-900">
        
        {/* Layer: Official Hydraulic Map */}
        {overlayActive ? (
          <div className="w-full h-full relative">
            <img 
              src={OFFICIAL_HYDRAULIC_MAP_URL} 
              alt="Plano Hidráulico Oficial de Managua" 
              className="w-full h-full object-cover opacity-90 contrast-125"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 text-white text-xs font-mono">
              Red Hidráulica y Colectores Pluviales de Managua (ALMA)
            </div>
          </div>
        ) : (
          /* Vector Visual Canvas of Managua */
          <div className="w-full h-full bg-[#0f172a] relative overflow-hidden">
            
            {/* Lake Xolotlán Northern Body */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-sky-950 via-sky-900/50 to-transparent border-b border-sky-400/20">
              <span className="absolute top-3 left-4 text-xs font-mono text-sky-300/80 tracking-widest uppercase">
                LAGO XOLOTLÁN DE MANAGUA
              </span>
            </div>

            {/* Stylized Main Cauces (Natural stormwater conduits flowing towards the lake) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {/* Cauce Occidental (Nejapa / Tiscapa hacia el lago) */}
              <path d="M 140 380 Q 180 200 240 60" stroke="#0284c7" strokeWidth="4" fill="none" opacity="0.85" />
              {/* Cauce Oriental (Villa Fontana / Tiscapa / El Dorado) */}
              <path d="M 380 390 Q 420 220 460 70" stroke="#0284c7" strokeWidth="5" fill="none" opacity="0.9" />
              {/* Cauce 31 de Diciembre / Sabana Grande */}
              <path d="M 600 390 Q 590 230 640 80" stroke="#0284c7" strokeWidth="3.5" fill="none" opacity="0.75" />
            </svg>

            {/* Urban Sector Annotations */}
            <span className="absolute top-32 left-16 text-[10px] font-mono text-slate-500">Distrito II</span>
            <span className="absolute top-44 left-1/3 text-[10px] font-mono text-slate-500">Distrito I (Tiscapa)</span>
            <span className="absolute top-48 left-2/3 text-[10px] font-mono text-slate-500">Distrito IV (El Dorado)</span>
            <span className="absolute bottom-16 right-20 text-[10px] font-mono text-slate-500">Distrito V (Schick)</span>
          </div>
        )}

        {/* Reservoir Marker Pins with Live Gauge Pills */}
        {reservoirs.map((res, i) => {
          const positions = [
            { top: '56%', left: '38%' }, // Los Gauchos
            { top: '36%', left: '46%' }, // Tiscapa
            { top: '74%', left: '72%' }  // Las Colinas
          ];
          const pos = positions[i] || { top: '50%', left: '50%' };
          return (
            <div
              key={res.id}
              style={{ top: pos.top, left: pos.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
              onClick={() => setSelectedPin({ type: 'reservoir', data: res })}
            >
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 text-white text-xs font-mono border border-sky-400 shadow-lg group-hover:scale-105 transition-transform">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                <span className="font-bold">{res.name}</span>
                <span className="text-sky-300 font-bold">({res.currentLevelMeters}m)</span>
              </div>
            </div>
          );
        })}

        {/* Mapped Citizen Reports Pins */}
        {reports.map((rep, idx) => {
          const topPercent = 30 + ((idx * 16) % 55);
          const leftPercent = 18 + ((idx * 21) % 70);

          const getStatusColor = (status: string) => {
            switch (status) {
              case 'resuelto': return 'bg-emerald-500 ring-emerald-300';
              case 'en_atencion': return 'bg-sky-500 ring-sky-300';
              case 'confirmado': return 'bg-red-500 ring-red-300';
              case 'en_verificacion': return 'bg-indigo-500 ring-indigo-300';
              default: return 'bg-amber-500 ring-amber-300';
            }
          };

          return (
            <div
              key={rep.id}
              style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
              onClick={() => setSelectedReport(rep)}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
            >
              <div className={`w-5 h-5 rounded-full ${getStatusColor(rep.status)} ring-4 ring-opacity-50 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-130`}>
                <span className="text-[9px] font-bold">!</span>
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 rounded bg-slate-900/95 text-white text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md z-30">
                {rep.folio}: {rep.title} ({rep.status})
              </div>
            </div>
          );
        })}

        {/* Legend strip */}
        <div className="absolute bottom-3 right-3 z-30 bg-slate-900/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] text-white flex items-center gap-3">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Confirmado</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> En atención</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Resuelto</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Pendiente</span>
        </div>

      </div>

      {/* Quick stats strip below tactical map */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
          <span className="text-slate-500 block text-[11px]">Total Incidencias:</span>
          <span className="text-lg font-bold font-mono text-slate-900">{reports.length}</span>
        </div>
        <div className="p-3 bg-red-50/70 rounded-xl border border-red-200 text-red-900">
          <span className="block text-[11px]">Puntos Críticos / Urgentes:</span>
          <span className="text-lg font-bold font-mono">{reports.filter(r => r.priority === 'urgente' || r.priority === 'alta').length}</span>
        </div>
        <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-200 text-sky-900">
          <span className="block text-[11px]">En Atención de Cuadrillas:</span>
          <span className="text-lg font-bold font-mono">{reports.filter(r => r.status === 'en_atencion').length}</span>
        </div>
        <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 text-emerald-900">
          <span className="block text-[11px]">Resueltos y Desobstruidos:</span>
          <span className="text-lg font-bold font-mono">{reports.filter(r => r.status === 'resuelto').length}</span>
        </div>
      </div>

    </div>
  );
};
