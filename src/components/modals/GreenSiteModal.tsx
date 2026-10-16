import React from 'react';
import { useContingencia } from '../../context/ContingenciaContext';
import { 
  X, 
  TreePine, 
  Droplet, 
  CheckCircle2, 
  MapPin, 
  FileText, 
  Compass, 
  ShieldCheck 
} from 'lucide-react';

export const GreenSiteModal: React.FC = () => {
  const { selectedGreenSite, setSelectedGreenSite } = useContingencia();

  if (!selectedGreenSite) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                {selectedGreenSite.solutionType.replace('_', ' ')}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {selectedGreenSite.district}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              {selectedGreenSite.name}
            </h3>
          </div>
          <button 
            onClick={() => setSelectedGreenSite(null)}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          <div className="rounded-2xl overflow-hidden aspect-video bg-slate-100 border border-slate-200">
            <img 
              src={selectedGreenSite.imageUrl} 
              alt={selectedGreenSite.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/80 space-y-1">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
              Ubicación y Cuenca Afectada:
            </span>
            <p className="font-semibold text-emerald-950 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>{selectedGreenSite.address}</span>
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
              Memoria Descriptiva de la Solución:
            </h4>
            <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
              {selectedGreenSite.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 block">Reducción de Escorrentía:</span>
              <strong className="text-emerald-700 text-sm">{selectedGreenSite.estimatedRunoffReduction}</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 block">Área Superficial:</span>
              <strong className="text-slate-900 text-sm">{selectedGreenSite.suitableAreaM2} m²</strong>
            </div>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Beneficios Ambientales e Hidrológicos:
            </h4>
            <ul className="space-y-1 text-slate-700">
              {selectedGreenSite.benefits.map((b, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setSelectedGreenSite(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-medium text-xs hover:bg-slate-800 transition-colors"
            >
              Cerrar Ficha Técnica
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
