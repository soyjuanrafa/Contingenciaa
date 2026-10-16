import React, { useState } from 'react';
import { useContingencia } from '../../context/ContingenciaContext';
import { OFFICIAL_HYDRAULIC_MAP_URL } from '../../data/mockData';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  MapPin, 
  Download, 
  ExternalLink,
  Info
} from 'lucide-react';

export const HydraulicMapModal: React.FC = () => {
  const { isHydraulicMapModalOpen, setHydraulicMapModalOpen } = useContingencia();
  const [zoom, setZoom] = useState<number>(1);

  if (!isHydraulicMapModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base text-slate-900">
                  Mapa Hidráulico Oficial de Managua
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200">
                  ALMA / DRENAJE PLUVIAL
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Red general de cauces matrices, colectores principales y vasos reguladores (micropresas).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
              <button
                onClick={() => setZoom(prev => Math.max(0.7, prev - 0.2))}
                className="p-1.5 hover:bg-white rounded text-slate-700"
                title="Alejar"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 text-xs font-mono font-bold text-slate-700">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom(prev => Math.min(2.5, prev + 0.2))}
                className="p-1.5 hover:bg-white rounded text-slate-700"
                title="Acercar"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoom(1)}
                className="p-1.5 hover:bg-white rounded text-slate-700 border-l border-slate-200"
                title="Restablecer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <a
              href={OFFICIAL_HYDRAULIC_MAP_URL}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Abrir imagen original"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => setHydraulicMapModalOpen(false)}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport with Zoomable Image */}
        <div className="flex-1 overflow-auto bg-slate-900 p-4 flex items-center justify-center relative">
          <div 
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
            className="transition-transform duration-200 max-w-full max-h-full"
          >
            <img 
              src={OFFICIAL_HYDRAULIC_MAP_URL} 
              alt="Plano Hidráulico Managua" 
              className="rounded-lg shadow-2xl max-w-none w-auto max-h-[75vh]"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-xs px-3 py-2 rounded-xl border border-slate-700 text-xs text-white max-w-md space-y-1">
            <span className="font-bold text-sky-400 block text-[11px] uppercase tracking-wider">
              Referencia Técnica de Cuenca:
            </span>
            <p className="text-[11px] text-slate-300 leading-tight">
              Managua cuenta con una pendiente natural de sur a norte hacia el lago Xolotlán. Las micropresas retienen los flujos torrenciales para evitar que los cauces matrices excedan su capacidad en el centro histórico y zonas comerciales.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
