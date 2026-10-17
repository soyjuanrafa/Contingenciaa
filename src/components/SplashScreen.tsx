import React, { useState, useEffect } from 'react';
import { OFFICIAL_LOGO_URL } from '../data/mockData';
import { ShieldCheck, Droplets, Activity, Wifi, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onFinish?: () => void;
  minDurationMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onFinish,
  minDurationMs = 2800 
}) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Iniciando plataforma de prevención...');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const steps = [
      { pct: 18, text: 'Iniciando sistema telemétrico pluvial...' },
      { pct: 42, text: 'Conectando con red de sensores ESP32 de Managua...' },
      { pct: 68, text: 'Cargando plano hidráulico de cauces y colectores...' },
      { pct: 88, text: 'Preparando base de datos comunitaria y modo sin internet...' },
      { pct: 100, text: '¡Sistema listo para la prevención comunitaria!' }
    ];

    let currentStepIdx = 0;
    const intervalTime = minDurationMs / 20;

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = Math.min(100, prev + 5);
        
        // Update status text
        const matchedStep = steps.find(s => next >= s.pct && next < (s.pct + 25));
        if (matchedStep) {
          setLoadingText(matchedStep.text);
        }

        if (next >= 100) {
          clearInterval(interval);
          setLoadingText('¡Bienvenido a Contingencia!');
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              setIsVisible(false);
              if (onFinish) onFinish();
            }, 600);
          }, 350);
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [minDurationMs, onFinish]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-between p-6 sm:p-12 text-white select-none transition-opacity duration-600 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top micro badges */}
      <div className="w-full max-w-md flex items-center justify-between text-xs text-slate-400 font-mono pt-4">
        <span className="flex items-center gap-1.5 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>V1.0 Piloto Managua</span>
        </span>
        <button
          onClick={() => {
            setIsFadingOut(true);
            setTimeout(() => {
              setIsVisible(false);
              if (onFinish) onFinish();
            }, 300);
          }}
          className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          Saltar &rarr;
        </button>
      </div>

      {/* Center Hero Lockup with Official Logo */}
      <div className="flex flex-col items-center text-center max-w-sm">
        
        {/* Logo Container with Ambient Glow */}
        <div className="relative mb-6">
          {/* Ambient Glow Halo */}
          <div className="absolute -inset-4 rounded-3xl bg-rose-600/20 blur-xl animate-pulse" />
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-rose-500/30 to-sky-500/30 blur-xs" />
          
          <div className="relative w-64 sm:w-72 h-24 sm:h-28 rounded-3xl bg-white/95 border border-slate-200/80 p-3 shadow-2xl flex items-center justify-center backdrop-blur-md">
            <img 
              src={OFFICIAL_LOGO_URL} 
              alt="Logo Contingencia Definitivo" 
              className="w-full h-full object-contain filter drop-shadow-sm"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Brand Title */}
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
          CONTENCIÓN
        </h1>
        <div className="mt-1 flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500" />
          <span className="text-xs font-semibold uppercase tracking-widest text-rose-400">
            Nicaragua
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500" />
        </div>

        <p className="mt-3 text-xs text-slate-400 leading-relaxed font-sans px-2">
          Plataforma inteligente para la prevención de inundaciones, monitoreo hídrico y gestión comunitaria en Managua.
        </p>

        {/* Progress Bar Container */}
        <div className="w-full mt-8 space-y-2">
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700/60">
            <div 
              style={{ width: `${progress}%` }}
              className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-sky-400 transition-all duration-300"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span className="truncate pr-2">{loadingText}</span>
            <span className="font-bold text-slate-200">{progress}%</span>
          </div>
        </div>

      </div>

      {/* Bottom Institutional Attribution */}
      <div className="w-full max-w-md text-center border-t border-slate-800/80 pt-4 text-[10px] text-slate-500">
        <p>
          Monitoreo de Micropresas &middot; Reportes Barriales &middot; Infraestructura Verde
        </p>
      </div>

    </div>
  );
};
