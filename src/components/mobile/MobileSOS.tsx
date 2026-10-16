import React, { useState, useRef, useEffect } from 'react';
import { useContingencia } from '../../context/ContingenciaContext';
import { EMERGENCY_CONTACTS, ALERT_AUDIO_URL } from '../../data/mockData';
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  X, 
  ChevronRight,
  ShieldAlert,
  Radio,
  UserCheck,
  Volume2,
  VolumeX
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MobileSOS: React.FC = () => {
  const { 
    activeSOS, 
    sosCountdown, 
    startSOS, 
    cancelSOS, 
    selectedReservoir 
  } = useContingencia();

  const [userName, setUserName] = useState('Juan Rafael Cerna');
  const [phone, setPhone] = useState('+505 8899-7711');
  const [address, setAddress] = useState('Barrio Los Ángeles, frente a micropresa Los Gauchos');
  const [emergencyType, setEmergencyType] = useState('Desborde de agua e ingreso a vivienda');
  const [isCalling, setIsCalling] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Web Audio emergency siren generator as resilient offline fallback
  const playWebAudioSiren = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.35);
      osc.frequency.exponentialRampToValueAtTime(850, ctx.currentTime + 0.7);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.95);
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleTriggerSOS = () => {
    // Play official alert audio
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(ALERT_AUDIO_URL);
      }
      audioRef.current.currentTime = 0;
      audioRef.current.volume = isMuted ? 0 : 0.9;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('Audio playback notice (browser autoplay policy or offline fallback):', err);
          if (!isMuted) playWebAudioSiren();
        });
      }
    } catch (e) {
      console.warn('Audio initialization error:', e);
      if (!isMuted) playWebAudioSiren();
    }

    startSOS({
      userName,
      phone,
      address,
      neighborhood: selectedReservoir.district,
      emergencyType
    });

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch (e) {
      // ignore
    }
  };

  const handleCancelSOS = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    cancelSOS();
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleCallContact = (contactName: string, number: string) => {
    setIsCalling(`${contactName} (${number})`);
    setTimeout(() => {
      setIsCalling(null);
    }, 3500);
  };

  return (
    <div className="space-y-4 pb-20 text-slate-800">
      
      {/* Calling Notification Banner Toast */}
      {isCalling && (
        <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-lg flex items-center justify-between text-xs animate-bounce">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 animate-pulse" />
            <span>Enlazando llamada con <strong>{isCalling}</strong>...</span>
          </div>
          <button onClick={() => setIsCalling(null)} className="p-1 hover:bg-emerald-700 rounded">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Screen Mode 1: Active Countdown / Sending Support (from Sketch 1 & 2) */}
      {activeSOS ? (
        <div className="space-y-4">
          
          {/* Status Header */}
          <div className="text-center py-2">
            <span className="text-[11px] font-bold text-red-600 tracking-wider uppercase">
              {activeSOS.status === 'buscando_cuadrilla' ? 'Localizando Cuadrilla Municipal' : 'Auxilio en Camino'}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              {activeSOS.status === 'buscando_cuadrilla' ? "Estamos enviando soporte" : "Brigada y Respondedores en Camino"}
            </h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
              {activeSOS.status === 'buscando_cuadrilla'
                ? "El puesto de mando COMUPRED Managua está asignando la cuadrilla más cercana a tu ubicación."
                : "Mantén la calma, desconecta aparatos eléctricos y espera la llegada de la unidad."
              }
            </p>
          </div>

          {/* Large Countdown Circular Ring (from Sketch 1 & 2) */}
          <div className="flex justify-center py-3">
            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* Outer Pulse Rings */}
              <div className="absolute inset-0 rounded-full border-4 border-red-500/20 animate-ping opacity-75 pointer-events-none" />
              <div className="absolute -inset-2 rounded-full border-2 border-red-400/30 pointer-events-none" />

              {/* Progress SVG */}
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="88"
                  cy="88"
                  r="74"
                  stroke="#FEE2E2"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="88"
                  cy="88"
                  r="74"
                  stroke="#DC2626"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 74}
                  strokeDashoffset={(2 * Math.PI * 74) * (1 - sosCountdown / 30)}
                  className="transition-all duration-1000"
                />
              </svg>

              {/* Center Counter */}
              <div className="absolute text-center">
                <span className="text-3xl font-bold font-mono tabular-nums text-red-600">
                  00:{String(sosCountdown).padStart(2, '0')}
                </span>
                <span className="block text-[11px] text-slate-500 font-medium uppercase mt-0.5">
                  Segundos
                </span>
              </div>
            </div>
          </div>

          {/* Assigned Responder Unit Card (from Sketch 2: Emily Dayton / Responder) */}
          {activeSOS.status === 'cuadrilla_en_camino' && (
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-red-100 border border-red-200 flex items-center justify-center text-red-700">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      {activeSOS.responderName}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {activeSOS.assignedBrigade} &middot; <strong className="text-red-600">A {activeSOS.etaMinutes} min</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Call & Message */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                <button
                  onClick={() => handleCallContact('Cuadrilla en Camino', '+505 8822-1100')}
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-600 text-white font-medium text-xs shadow-xs hover:bg-red-700 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Llamar Cuadrilla</span>
                </button>
                <button
                  onClick={() => handleCallContact('Chat Radio COMUPRED', 'Enlace')}
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 text-slate-800 font-medium text-xs hover:bg-slate-200 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-slate-600" />
                  <span>Mensaje de Radio</span>
                </button>
              </div>
            </div>
          )}

          {/* Current Address Lockup (from Sketch 2) */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">
              Tu dirección reportada:
            </span>
            <div className="flex items-center gap-2 mt-1 text-slate-800 font-medium">
              <MapPin className="w-4 h-4 text-red-600 shrink-0" />
              <span className="truncate">{activeSOS.address}</span>
            </div>
          </div>

          {/* Mute and Cancel Buttons */}
          <div className="flex gap-2">
            <button
              onClick={toggleMute}
              className="py-2.5 px-3 rounded-xl border border-slate-300 text-slate-600 font-medium text-xs hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"
              title={isMuted ? "Activar audio" : "Silenciar audio"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-red-600 animate-pulse" />}
              <span>{isMuted ? "Silenciado" : "Alerta Sonora"}</span>
            </button>

            <button
              onClick={handleCancelSOS}
              className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-medium text-xs hover:bg-slate-100 transition-colors"
            >
              Cancelar Emergencia
            </button>
          </div>
        </div>
      ) : (
        /* Screen Mode 2: Idle Standby (Press SOS to Request Help, from Sketch 2) */
        <div className="space-y-4">
          
          <div className="text-center py-2">
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
              Asistencia Inmediata por Lluvias
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              ¿Estás en emergencia?
            </h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
              Presiona el botón para despachar una cuadrilla de mitigación o rescate municipal.
            </p>
          </div>

          {/* Big SOS Button with Concentric Rings (from Sketch 2) */}
          <div className="flex justify-center py-4">
            <div className="relative group">
              {/* Outer Glowing Rings */}
              <div className="absolute -inset-4 rounded-full bg-red-100/60 blur-xs transition-all group-hover:scale-105" />
              <div className="absolute -inset-1 rounded-full border-2 border-red-300/60" />

              <button
                onClick={handleTriggerSOS}
                className="relative w-40 h-40 rounded-full bg-gradient-to-br from-red-500 to-rose-700 text-white font-black text-3xl shadow-xl shadow-red-600/30 flex flex-col items-center justify-center active:scale-95 transition-transform"
              >
                <span className="tracking-widest">SOS</span>
                <span className="text-[10px] font-normal tracking-normal opacity-90 mt-1">
                  Auxilio Inundación
                </span>
              </button>
            </div>
          </div>

          {/* Emergency Form Configuration */}
          <div className="p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-2.5">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span>Verifica tus datos de auxilio:</span>
            </div>

            <div>
              <label className="text-[10px] text-slate-500 block">Tu Nombre:</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-500 block">Teléfono de Contacto:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs font-mono px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-500 block">Dirección / Punto de Referencia:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-500 block">Tipo de Incidencia Crítica:</label>
              <select
                value={emergencyType}
                onChange={(e) => setEmergencyType(e.target.value)}
                className="w-full text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-red-500 cursor-pointer"
              >
                <option value="Desborde de agua e ingreso a vivienda">Desborde de agua e ingreso a vivienda</option>
                <option value="Colapso de muro perimetral o talud de cauce">Colapso de muro o talud de cauce</option>
                <option value="Vehículo atrapado en corriente fuerte">Vehículo atrapado en corriente fuerte</option>
                <option value="Personas atrapadas por escorrentía">Personas atrapadas por escorrentía</option>
              </select>
            </div>
          </div>

        </div>
      )}

      {/* Emergency Contact List (from Sketch 1: Emergency Contact List) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-red-600" />
            <span>Líneas Directas de Emergencia</span>
          </h3>
          <span className="text-[10px] text-slate-500">Nicaragua</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 shadow-xs">
          {EMERGENCY_CONTACTS.map((contact, idx) => (
            <div 
              key={idx}
              className="p-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="min-w-0 pr-2">
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {contact.name}
                </h4>
                <p className="text-[10px] text-slate-500 truncate">
                  {contact.desc}
                </p>
              </div>

              <button
                onClick={() => handleCallContact(contact.name, contact.number)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold font-mono transition-colors shrink-0"
                title={`Marcar al ${contact.number}`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{contact.number}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
