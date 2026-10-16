import React, { useState } from 'react';
import { useContingencia } from '../../context/ContingenciaContext';
import { GreenInfraSite, SolutionType } from '../../types';
import { 
  TreePine, 
  Droplet, 
  CheckCircle2, 
  MapPin, 
  Layers, 
  Plus, 
  Sparkles,
  TrendingUp,
  FileCheck2,
  FileSpreadsheet
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const GreenInfrastructurePanel: React.FC = () => {
  const { greenInfraSites, reports, addGreenInfraSite, setSelectedGreenSite } = useContingencia();

  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('Distrito I');
  const [solutionType, setSolutionType] = useState<SolutionType>('jardin_lluvia');
  const [address, setAddress] = useState('');
  const [suitableAreaM2, setSuitableAreaM2] = useState<number>(450);
  const [estimatedRunoff, setEstimatedRunoff] = useState('35% de escorrentía superficial');
  const [description, setDescription] = useState('');

  const handleCreateSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address) return;

    addGreenInfraSite({
      name,
      solutionType,
      district,
      address,
      coordinates: { lat: 12.1310, lng: -86.2620 },
      estimatedRunoffReduction: estimatedRunoff,
      suitableAreaM2,
      status: 'en_estudio',
      description: description || 'Proyecto técnico priorizado tras análisis de recurrencia pluvial.',
      soilType: 'Suelo urbano franco con subcapa drenante',
      benefits: [
        'Disminución del caudal pico hacia cauces urbanos',
        'Infiltración natural al manto acuífero de Managua'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80'
    });

    setShowAddModal(false);
    setName('');
    setAddress('');
    setDescription('');

    try {
      confetti({ particleCount: 35, spread: 50 });
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-sm text-slate-900">
              Componente Ambiental: Planificación de Infraestructura Verde
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-mono font-medium border border-emerald-200">
              Sostenibilidad Urbana
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Estrategia para retener e infiltrar agua in situ y reducir la escorrentía hacia las micropresas.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Sitio Candidato</span>
        </button>
      </div>

      {/* Recurrence Analysis Box (From PDF Section 6: ¿Cómo se relaciona con la tecnología?) */}
      <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200/90 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xs text-emerald-950 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <span>Detección de Puntos Críticos Recurrentes (Criterio Técnico):</span>
          </span>
          <span className="text-[10px] text-emerald-800 font-mono font-bold">
            Algoritmo de Priorización
          </span>
        </div>
        <p className="text-xs text-emerald-900 leading-relaxed">
          Cuando un punto acumula reportes ciudadanos en múltiples lluvias (ej. <em>Barrio Los Ángeles</em> y <em>Pista Solidaridad</em>), el sistema orienta una inspección técnica para evaluar si un <strong>jardín de lluvia</strong> o <strong>cuneta permeable</strong> alivia la carga de los drenajes antes de construir obras grises costosas.
        </p>
      </div>

      {/* Candidate Sites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {greenInfraSites.map(site => (
          <div 
            key={site.id}
            onClick={() => setSelectedGreenSite(site)}
            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-all cursor-pointer space-y-3 shadow-xs hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                  {site.solutionType.replace('_', ' ')} &middot; {site.district}
                </span>
                <h4 className="font-bold text-xs text-slate-900 mt-0.5">
                  {site.name}
                </h4>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                site.status === 'validado_tecnico' ? 'bg-emerald-100 text-emerald-800' :
                site.status === 'prioridad_alta' ? 'bg-rose-100 text-rose-800' :
                'bg-slate-100 text-slate-700'
              }`}>
                {site.status === 'validado_tecnico' ? 'Validado Técnico' : site.status === 'prioridad_alta' ? 'Prioridad Alta' : 'En Estudio'}
              </span>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2">
              {site.description}
            </p>

            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500 font-mono">
              <div>
                <span className="block text-[10px] text-slate-400">Infiltración Estimada:</span>
                <strong className="text-emerald-700">{site.estimatedRunoffReduction}</strong>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400">Área de Cuenca:</span>
                <strong className="text-slate-800">{site.suitableAreaM2} m²</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Site Modal */}
      {showAddModal && (
        <div className="p-4 bg-slate-50 rounded-2xl border-2 border-emerald-400 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
              Nuevo Proyecto de Infraestructura Verde para Estudio Técnico
            </h4>
            <button onClick={() => setShowAddModal(false)} className="text-xs text-slate-400 hover:text-slate-600">
              Cerrar
            </button>
          </div>

          <form onSubmit={handleCreateSite} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-600 font-medium block mb-1">Nombre del Espacio / Proyecto:</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Bio-zanja Pista Suburbana km 8.5"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="text-slate-600 font-medium block mb-1">Tipo de Solución:</label>
              <select
                value={solutionType}
                onChange={(e) => setSolutionType(e.target.value as SolutionType)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
              >
                <option value="jardin_lluvia">Jardín de Lluvia (Bio-retención)</option>
                <option value="superficie_permeable">Superficie Permeable (Concreto poroso)</option>
                <option value="infiltracion_vegetada">Área de Infiltración Vegetada</option>
                <option value="recuperacion_verde">Recuperación de Franja Verde Ribereña</option>
              </select>
            </div>

            <div>
              <label className="text-slate-600 font-medium block mb-1">Distrito:</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
              >
                <option value="Distrito I">Distrito I</option>
                <option value="Distrito II">Distrito II</option>
                <option value="Distrito III">Distrito III</option>
                <option value="Distrito IV">Distrito IV</option>
                <option value="Distrito V">Distrito V</option>
              </select>
            </div>

            <div>
              <label className="text-slate-600 font-medium block mb-1">Área Estimada (m²):</label>
              <input
                type="number"
                value={suitableAreaM2}
                onChange={(e) => setSuitableAreaM2(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-slate-600 font-medium block mb-1">Dirección y Puntos de Escorrentía:</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ubicación exacta..."
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
              />
            </div>

            <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-600"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors"
              >
                Guardar Expediente de Estudio
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
