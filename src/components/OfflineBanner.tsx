import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 bg-amber-600 text-white p-3 rounded-2xl shadow-xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <WifiOff className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-xs">Modo Sin Conexión Activo (PWA)</h4>
          <p className="text-[10px] text-amber-100 leading-tight">
            Los datos se guardan en tu teléfono y se sincronizarán al regresar la señal.
          </p>
        </div>
      </div>

      <span className="shrink-0 text-[10px] font-bold font-mono px-2 py-1 rounded bg-black/20">
        OFFLINE
      </span>
    </div>
  );
};
