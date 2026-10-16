import React, { useState } from 'react';
import { useContingencia } from '../../context/ContingenciaContext';
import { GreenInfraSite, SolutionType } from '../../types';
import { 
  TreePine, 
  Droplet, 
  Layers, 
  MapPin, 
  Check, 
  Sparkles, 
  Plus, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MobileEco: React.FC = () => {
  const { greenInfraSites, addGreenInfraSite, setSelectedGreenSite } = useContingencia();
  const [showProposeModal, setShowProposeModal] = useState(false);
  const [siteName, setSiteName] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('Distrito I');
  const [solutionType, setSolutionType] = useState<SolutionType>('jardin_lluvia');
  const [areaM2, setAreaM2] = useState<number>(300);
  const [notes, setNotes] = useState('');

  const handlePropose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteName || !address) return;

    addGreenInfraSite({
      name: siteName,
      solutionType,
      district,
      address,
      coordinates: { lat: 12.1280, lng: -86.2680 },
      estimatedRunoffReduction: '30% estimado de infiltración',
      suitableAreaM2: areaM2,
      status: 'en_estudio',
      description: notes || 'Propuesta postulada por vecinos para mitigar acumulación de escorrentía barrial.',
      soilType: 'Suelo urbano con potencial de mejora granular',
      benefits: ['Retención in situ del agua de lluvia', 'Reducción de carga en tragantes'],
      imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80'
    });

    setShowProposeModal(false);
    setSiteName('');
    setAddress('');
    setNotes('');

    try {
      confetti({ particleCount: 40, spread: 60 });
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="space-y-4 pb-20 text-slate-800">
      
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-2xl border border-emerald-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
          <TreePine className="w-4 h-4 text-emerald-600" />
          <span>Infraestructura Verde Urbana</span>
        </div>
        <h2 className="text-lg font-bold text-slate-900 mt-1">
          Soluciones Basadas en la Naturaleza
        </h2>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          Las micropresas de Managua retienen agua, pero los <strong>jardines de lluvia</strong> y <strong>pavimentos permeables</strong> absorben la escorrentía donde cae, evitando que los barrios bajos colapsen.
        </p>

        <button
          onClick={() => setShowProposeModal(true)}
          className="mt-3 w-full py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-medium text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-700 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Proponer Espacio Barrial para Jardín de Lluvia</span>
        </button>
      </div>

      {/* Propose Modal */}
      {showProposeModal && (
        <div className="p-4 bg-white rounded-2xl border-2 border-emerald-500 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Postular Sitio para Evaluación Técnica
            </h3>
            <button 
              onClick={() => setShowProposeModal(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Cerrar
            </button>
          </div>

          <form onSubmit={handlePropose} className="space-y-2.5">
            <div>
              <label className="text-[10px] text-slate-500 block mb-0.5">Nombre del espacio o predio:</label>
              <input
                type="text"
                required
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="Ej. Bulevar Central Barrio El Paraisito"
                className="w-full text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">Distrito:</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full text-xs font-medium px-2 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden"
                >
                  <option value="Distrito I">Distrito I</option>
                  <option value="Distrito II">Distrito II</option>
                  <option value="Distrito III">Distrito III</option>
                  <option value="Distrito IV">Distrito IV</option>
                  <option value="Distrito V">Distrito V</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">Tipo de Solución:</label>
                <select
                  value={solutionType}
                  onChange={(e) => setSolutionType(e.target.value as SolutionType)}
                  className="w-full text-xs font-medium px-2 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden"
                >
                  <option value="jardin_lluvia">Jardín de Lluvia</option>
                  <option value="superficie_permeable">Superficie Permeable</option>
                  <option value="infiltracion_vegetada">Área de Infiltración</option>
                  <option value="recuperacion_verde">Recuperación Verde</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-500 block mb-0.5">Dirección o Referencia:</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Del semáforo 1c arriba..."
                className="w-full text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-500 block mb-0.5">¿Por qué es conveniente este lugar?:</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Aquí se empoza el agua cada tormenta..."
                className="w-full text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-xs"
            >
              Registrar Propuesta Comunitaria
            </button>
          </form>
        </div>
      )}

      {/* Catalog of candidate projects */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider px-1">
          Sitios Priorizados en Estudio ({greenInfraSites.length})
        </h3>

        {greenInfraSites.map(site => (
          <div
            key={site.id}
            onClick={() => setSelectedGreenSite(site)}
            className="p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all cursor-pointer space-y-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                  {site.solutionType.replace('_', ' ')} &middot; {site.district}
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-0.5">
                  {site.name}
                </h4>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-medium shrink-0 ${
                site.status === 'prioridad_alta' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                site.status === 'validado_tecnico' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                'bg-slate-100 text-slate-700'
              }`}>
                {site.status === 'prioridad_alta' ? 'Prioridad Alta' : site.status === 'validado_tecnico' ? 'Validado Técnico' : 'En Estudio'}
              </span>
            </div>

            <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
              {site.description}
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>Reducción: <strong>{site.estimatedRunoffReduction}</strong></span>
              <span>Área: <strong>{site.suitableAreaM2} m²</strong></span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
