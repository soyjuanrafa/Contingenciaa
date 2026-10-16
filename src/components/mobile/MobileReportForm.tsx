import React, { useState } from 'react';
import { useContingencia } from '../../context/ContingenciaContext';
import { ReportCategory } from '../../types';
import { 
  Camera, 
  MapPin, 
  AlertCircle, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  FileText, 
  CheckCircle2,
  Trash2,
  Droplets,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

const CATEGORIES: { id: ReportCategory; label: string; desc: string; icon: string }[] = [
  { 
    id: 'calle_inundada', 
    label: 'Calle Inundada', 
    desc: 'Acumulación de agua que impide paso vehicular o peatonal.',
    icon: '🌊'
  },
  { 
    id: 'tragante_obstruido', 
    label: 'Tragante Obstruido', 
    desc: 'Rejilla colapsada por basura, hojas o sedimentos.',
    icon: '🕳️'
  },
  { 
    id: 'acumulacion_basura', 
    label: 'Basura / Sedimentos', 
    desc: 'Desechos sólidos en drenajes o cunetas que frenan el flujo.',
    icon: '🗑️'
  },
  { 
    id: 'desborde_cauce', 
    label: 'Desborde de Cauce', 
    desc: 'Nivel pluvial al borde de la sección hidráulica del cauce.',
    icon: '⚠️'
  },
  { 
    id: 'aumento_nivel', 
    label: 'Aumento Preocupante de Agua', 
    desc: 'Crecida acelerada observada en micropresa o cuerpo hídrico.',
    icon: '📈'
  },
  { 
    id: 'dano_infraestructura', 
    label: 'Daño en Infraestructura', 
    desc: 'Socavación de talud, rotura de muro o losa fracturada.',
    icon: '🧱'
  }
];

const SAMPLE_PHOTOS = [
  { label: 'Calle anegada', url: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80' },
  { label: 'Tragante bloqueado', url: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=800&q=80' },
  { label: 'Cauce crecido', url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80' },
  { label: 'Sedimentos en cuneta', url: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80' }
];

export const MobileReportForm: React.FC = () => {
  const { addReport, setMobileTab, setSelectedReport } = useContingencia();

  const [step, setStep] = useState<number>(1);
  const [category, setCategory] = useState<ReportCategory>('calle_inundada');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [district, setDistrict] = useState('Distrito I');
  const [neighborhood, setNeighborhood] = useState('Barrio Los Ángeles');
  const [address, setAddress] = useState('De la rotonda El Güegüense 2c abajo, 1c al lago');
  const [waterDepthCm, setWaterDepthCm] = useState<number>(25);
  const [photoUrl, setPhotoUrl] = useState(SAMPLE_PHOTOS[0].url);
  const [reporterName, setReporterName] = useState('Mariana Bermúdez');
  const [reporterPhone, setReporterPhone] = useState('+505 8733-2211');
  const [createdReportFolio, setCreatedReportFolio] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitle = title.trim() || `${CATEGORIES.find(c => c.id === category)?.label} en ${neighborhood}`;
    const newRep = addReport({
      category,
      title: finalTitle,
      description: description.trim() || 'Incidencia reportada por habitante local para inspección y desobstrucción de drenaje pluvial.',
      zone: district,
      neighborhood,
      address,
      photoUrl,
      reporterName,
      reporterPhone,
      waterDepthCm,
      priority: waterDepthCm > 40 ? 'urgente' : waterDepthCm > 20 ? 'alta' : 'media'
    });

    setCreatedReportFolio(newRep.folio);
    setSelectedReport(newRep);

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  if (createdReportFolio) {
    return (
      <div className="p-6 bg-white rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm my-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div>
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
            Reporte Registrado con Éxito
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            Folio: {createdReportFolio}
          </h3>
          <p className="text-xs text-slate-600 mt-2 max-w-xs mx-auto">
            Tu reporte ha ingresado a la plataforma en estado <strong>Pendiente de revisión</strong>. Ya está visible en el Centro de Mando Municipal para las brigadas de Managua.
          </p>
        </div>

        {/* 5 Status Clarification Infobox (From PDF Page 4: ¿Cómo evitaremos la desinformación?) */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-1.5">
          <span className="font-bold text-slate-800 text-[11px] block">
            Próximos pasos en la gestión:
          </span>
          <div className="flex items-center gap-2 text-slate-600 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>1. Pendiente &rarr; 2. En verificación por técnico COMUPRED</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span>3. Confirmado &rarr; 4. Asignación de cuadrilla de campo</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>5. Resuelto con bitácora fotográfica de limpieza</span>
          </div>
        </div>

        <div className="pt-2 space-y-2">
          <button
            onClick={() => {
              setCreatedReportFolio(null);
              setStep(1);
              setMobileTab('home');
            }}
            className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-medium text-xs hover:bg-slate-800 transition-colors"
          >
            Volver al Inicio
          </button>
          <button
            onClick={() => {
              setCreatedReportFolio(null);
              setStep(1);
              setMobileTab('map');
            }}
            className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium text-xs hover:bg-slate-50 transition-colors"
          >
            Ver en Mapa Comunitario
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20 text-slate-800">
      
      {/* Step Indicator Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">
            Reporte Ciudadano &middot; Paso {step} de 3
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            {step === 1 && 'Selecciona el Tipo de Problema'}
            {step === 2 && 'Ubicación y Profundidad del Agua'}
            {step === 3 && 'Fotografía y Contacto'}
          </h2>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map(s => (
            <div 
              key={s} 
              className={`w-6 h-1.5 rounded-full transition-all ${step >= s ? 'bg-rose-600' : 'bg-slate-200'}`} 
            />
          ))}
        </div>
      </div>

      {/* STEP 1: Categories */}
      {step === 1 && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-2">
            {CATEGORIES.map(cat => (
              <div
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                  category === cat.id
                    ? 'border-rose-500 bg-rose-50/50 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl p-1 bg-white rounded-xl shadow-2xs border border-slate-100">
                    {cat.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      {cat.label}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                      {cat.desc}
                    </p>
                  </div>
                </div>
                {category === cat.id && (
                  <div className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-3 rounded-xl bg-rose-600 text-white font-medium text-xs flex items-center justify-center gap-2 hover:bg-rose-700 shadow-sm transition-colors mt-4"
          >
            <span>Continuar a Ubicación</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: Location & Depth */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Distrito de Managua:
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-rose-500"
              >
                <option value="Distrito I">Distrito I (Tiscapa, Los Gauchos, Los Ángeles)</option>
                <option value="Distrito II">Distrito II (Monseñor Lezcano, Batahola)</option>
                <option value="Distrito III">Distrito III (San Patricio, Pista Suburbana)</option>
                <option value="Distrito IV">Distrito IV (El Dorado, San Luis, El Edén)</option>
                <option value="Distrito V">Distrito V (14 de Septiembre, Reparto Schick)</option>
                <option value="Distrito VI">Distrito VI (La Subasta, Villa Reconciliación)</option>
                <option value="Distrito VII">Distrito VII (Villa Venezuela, Laureles Sur)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Barrio o Reparto:
              </label>
              <input
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder="Ej. Barrio Los Ángeles, Bello Horizonte..."
                className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-rose-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Dirección exacta o punto de referencia:
              </label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ej. Del puente El Paraisito 2c al sur..."
                className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-rose-500"
              />
            </div>

            {/* Depth Slider */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-sky-600" />
                  <span>Nivel o lámina de agua estimada:</span>
                </label>
                <span className="text-xs font-bold font-mono text-sky-700">
                  {waterDepthCm} cm
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={waterDepthCm}
                onChange={(e) => setWaterDepthCm(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>Encharcado (5cm)</span>
                <span>Sobre acera (25cm)</span>
                <span>Peligro autos (50cm+)</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setStep(1)}
              className="py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-medium text-xs hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-3 rounded-xl bg-rose-600 text-white font-medium text-xs flex items-center justify-center gap-2 hover:bg-rose-700 shadow-sm transition-colors"
            >
              <span>Continuar a Foto y Envío</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Photo Evidence & Contact */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3.5 shadow-xs">
            
            {/* Photo Selection */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-slate-600" />
                <span>Fotografía de la Incidencia:</span>
              </label>

              <div className="grid grid-cols-4 gap-2 mb-2">
                {SAMPLE_PHOTOS.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => setPhotoUrl(p.url)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                      photoUrl === p.url ? 'border-rose-600 scale-102 ring-2 ring-rose-200' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              <div className="text-[10px] text-slate-500">
                Selecciona una foto de prueba o confirma el registro visual para el expediente técnico.
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Detalles adicionales / Observaciones:
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe si hay ramas grandes, familias incomunicadas o daños en drenaje..."
                className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-rose-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <div>
                <label className="text-[10px] text-slate-500 block mb-1">Tu Nombre:</label>
                <input
                  type="text"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  className="w-full text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-1">Teléfono:</label>
                <input
                  type="text"
                  value={reporterPhone}
                  onChange={(e) => setReporterPhone(e.target.value)}
                  className="w-full text-xs font-mono px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>

          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-medium text-xs hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all active:scale-98"
            >
              <Check className="w-4 h-4" />
              <span>Enviar Reporte Comunitario</span>
            </button>
          </div>
        </form>
      )}

    </div>
  );
};
