import React, { useState } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { OFFICIAL_LOGO_URL } from '../../data/mockData';
import { 
  X, 
  Download, 
  Smartphone, 
  CheckCircle2, 
  ExternalLink, 
  QrCode, 
  HelpCircle,
  Copy,
  Check,
  ShieldCheck,
  Package
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ApkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkDownloadModal: React.FC<ApkDownloadModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, install, isIOS, isAndroid } = usePWAInstall();
  const [copiedUrl, setCopiedUrl] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://contingencia-nicaragua.app';

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      try {
        confetti({ particleCount: 50, spread: 60 });
      } catch (e) {
        // ignore
      }
      onClose();
    }
  };

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const handleDownloadManifestPackage = () => {
    const manifestData = {
      name: "CONTINGENCIA - Prevención de Inundaciones",
      short_name: "Contingencia",
      description: "Plataforma inteligente para la prevención de inundaciones y gestión comunitaria en Managua, Nicaragua.",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#dc2626",
      icons: [
        {
          src: OFFICIAL_LOGO_URL,
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable"
        }
      ]
    };

    const blob = new Blob([JSON.stringify(manifestData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contingencia-android-manifest.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">
                Descargar e Instalar en Android (APK / PWA)
              </h3>
              <p className="text-xs text-slate-500">
                Instalación directa con funcionamiento offline y soporte táctil completo.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 text-xs text-slate-700">
          
          {/* Status banner */}
          {isInstalled ? (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <strong className="block text-xs">¡Ya tienes la app instalada!</strong>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Esta aplicación ya está configurada en modo standalone con funcionamiento sin internet.
                </p>
              </div>
            </div>
          ) : isInstallable ? (
            <div className="p-4 bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl text-white shadow-md shadow-red-600/20 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-tight">
                    Instalar Aplicación en este Dispositivo
                  </h4>
                  <p className="text-[11px] text-red-100 mt-0.5">
                    Tu navegador permite instalar Contingencia como una App nativa con icono propio.
                  </p>
                </div>
              </div>

              <button
                onClick={handleInstallClick}
                className="w-full py-2.5 rounded-xl bg-white text-rose-700 font-bold text-xs hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Instalar Ahora (WebAPK Android)</span>
              </button>
            </div>
          ) : null}

          {/* How Android WebAPK Works Infobox */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 text-xs block uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>¿Cómo funciona la instalación de APK en Android?</span>
            </span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              En dispositivos Android, los navegadores modernos (Google Chrome, Brave, Samsung Internet) compilan las aplicaciones PWA directamente en un archivo <strong>WebAPK</strong> a través de Google Play Services. Esto genera una aplicación nativa que:
            </p>
            <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
              <li>Se añade al cajón de aplicaciones y pantalla de inicio con el logo oficial.</li>
              <li>Funciona a pantalla completa sin barras del navegador.</li>
              <li><strong>Opera 100% sin conexión a internet</strong> almacenando mapas y reportes locales.</li>
            </ul>
          </div>

          {/* 3 Steps for Manual Installation on Android */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Instrucciones para instalar en Android:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center mx-auto">1</span>
                <span className="font-bold text-slate-900 text-xs block">Abre en Chrome</span>
                <p className="text-[10px] text-slate-500">Abre el enlace de la app en tu teléfono Android.</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center mx-auto">2</span>
                <span className="font-bold text-slate-900 text-xs block">Menú (3 Puntos)</span>
                <p className="text-[10px] text-slate-500">Toca el botón ⋮ en la esquina superior del navegador.</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center mx-auto">3</span>
                <span className="font-bold text-slate-900 text-xs block">Instalar App</span>
                <p className="text-[10px] text-slate-500">Selecciona "Instalar aplicación" o "Agregar a inicio".</p>
              </div>
            </div>
          </div>

          {/* iOS Safari Instructions */}
          {isIOS && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs space-y-1 text-amber-900">
              <strong className="block font-bold">En iPhone / iPad (iOS Safari):</strong>
              <p className="text-[11px] text-amber-800">
                1. Toca el botón <strong>Compartir</strong> (icono de cuadrado con flecha hacia arriba).<br />
                2. Baja en el menú y selecciona <strong>"Agregar a pantalla de inicio"</strong>.
              </p>
            </div>
          )}

          {/* Quick Copy Link Bar */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
              Enlace directo para compartir e instalar en el teléfono:
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-mono text-slate-700 select-all"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center gap-1.5 shrink-0 transition-colors"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUrl ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
          </div>

          {/* Download APK / Manifest Package */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handleDownloadManifestPackage}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5"
            >
              <Package className="w-4 h-4" />
              <span>Descargar Manifiesto Android (.json)</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors"
            >
              Cerrar
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
