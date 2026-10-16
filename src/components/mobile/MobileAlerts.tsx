import React, { useState } from 'react';
import { useContingencia } from '../../context/ContingenciaContext';
import { 
  AlertTriangle, 
  ShieldCheck, 
  ExternalLink, 
  Clock, 
  Info, 
  CheckCircle2, 
  HelpCircle,
  Radio,
  FileText
} from 'lucide-react';

export const MobileAlerts: React.FC = () => {
  const { alerts } = useContingencia();
  const [tab, setTab] = useState<'avisos' | 'guias'>('avisos');
  const [guidePhase, setGuidePhase] = useState<'antes' | 'durante' | 'despues'>('durante');

  return (
    <div className="space-y-4 pb-20 text-slate-800">
      
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
          Módulo de Comunicación Responsable
        </span>
        <h2 className="text-lg font-bold text-slate-900">
          Alertas e Información Preventiva
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Diferenciamos avisos técnicos del sistema de alertas oficiales gubernamentales.
        </p>
      </div>

      {/* Segmented Control Tabs */}
      <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-medium">
        <button
          onClick={() => setTab('avisos')}
          className={`flex-1 py-1.5 rounded-lg transition-all text-center ${
            tab === 'avisos'
              ? 'bg-white text-slate-900 font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Avisos Activos ({alerts.length})
        </button>
        <button
          onClick={() => setTab('guias')}
          className={`flex-1 py-1.5 rounded-lg transition-all text-center ${
            tab === 'guias'
              ? 'bg-white text-slate-900 font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Guía Ciudadana de Lluvias
        </button>
      </div>

      {tab === 'avisos' ? (
        <div className="space-y-3">
          
          {/* Institutional Integrity Notice (From PDF Componente 3 & 6: Relación con Instituciones) */}
          <div className="p-3 bg-sky-50/80 rounded-2xl border border-sky-200 text-xs text-sky-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[11px] text-sky-900">
              <Info className="w-3.5 h-3.5 text-sky-700" />
              <span>Criterio de Responsabilidad Institucional</span>
            </div>
            <p className="text-[11px] text-sky-800 leading-relaxed">
              La plataforma <strong>CONTINGENCIA no declara por cuenta propia alertas oficiales</strong> ni sustituye a las autoridades de <strong>SINAPRED</strong> o <strong>INETER</strong>. Nuestros avisos se basan estrictamente en la telemetría de reservorios y reportes comunitarios.
            </p>
          </div>

          {/* List of Alerts */}
          <div className="space-y-2.5">
            {alerts.map(alert => (
              <div 
                key={alert.id}
                className={`p-4 rounded-2xl border transition-all ${
                  alert.origin === 'oficial_autoridades'
                    ? 'bg-rose-50/60 border-rose-200'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    alert.origin === 'oficial_autoridades'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {alert.origin === 'oficial_autoridades' ? '🏛️ Alerta Oficial de Autoridades' : '📡 Aviso Técnico de Plataforma'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {alert.timestamp}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-slate-900 leading-snug">
                  {alert.title}
                </h3>

                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {alert.message}
                </p>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-medium text-slate-700">
                    Emisor: {alert.entity}
                  </span>
                  {alert.officialSourceUrl && (
                    <a 
                      href={alert.officialSourceUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-rose-600 font-semibold inline-flex items-center gap-1 hover:underline"
                    >
                      <span>Portal Oficial</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {alert.technicalRule && (
                  <div className="mt-2 text-[10px] text-slate-500 font-mono bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                    Regla técnica: {alert.technicalRule}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      ) : (
        /* Guides: Antes, Durante y Después (From PDF Section 4) */
        <div className="space-y-3">
          
          {/* Phase selector pills */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setGuidePhase('antes')}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                guidePhase === 'antes' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Antes
            </button>
            <button
              onClick={() => setGuidePhase('durante')}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                guidePhase === 'durante' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Durante
            </button>
            <button
              onClick={() => setGuidePhase('despues')}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                guidePhase === 'despues' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Después
            </button>
          </div>

          {guidePhase === 'antes' && (
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                Prevención y Preparación Comunitaria
              </span>
              <ul className="text-xs text-slate-700 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Despeje preventivo:</strong> Limpia canaletas, patios y no dejes ripio o ramas en cunetas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Monitorea reservorios:</strong> Consulta el nivel del reservorio más cercano en la app.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Reporta a tiempo:</strong> Si observas un tragante tapado, envíalo a la plataforma antes de que inicie la lluvia.</span>
                </li>
              </ul>
            </div>
          )}

          {guidePhase === 'durante' && (
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3">
              <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
                Monitoreo y Respuesta en la Tormenta
              </span>
              <ul className="text-xs text-slate-700 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>No cruzar cauces crecidos:</strong> Ni a pie ni en vehículo; la corriente en Managua arrastra sedimentos y vehículos pesados.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Corte de energía:</strong> Desconecta interruptores principales si el agua sube de la cota del piso.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Botón SOS:</strong> Utiliza el botón SOS de Contingencia solo para emergencias con riesgo de vidas o familias atrapadas.</span>
                </li>
              </ul>
            </div>
          )}

          {guidePhase === 'despues' && (
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3">
              <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider block">
                Evaluación y Recuperación Barrial
              </span>
              <ul className="text-xs text-slate-700 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span><strong>Documentar daños:</strong> Registra socavación en taludes o losas fracturadas con fotografías en la app.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span><strong>Inspección técnica:</strong> La recurrencia de anegamiento en un punto orientará la propuesta de jardines de lluvia.</span>
                </li>
              </ul>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
