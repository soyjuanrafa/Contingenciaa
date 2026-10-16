import React from 'react';
import { useContingencia } from '../../context/ContingenciaContext';
import { 
  Activity, 
  CloudRain, 
  Droplets, 
  RotateCcw, 
  Sliders, 
  Wifi, 
  Battery, 
  Cpu, 
  AlertTriangle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export const TelemetrySensorCard: React.FC = () => {
  const { 
    selectedReservoir, 
    triggerSimulatedRain, 
    triggerDrain, 
    isSimulatingRain, 
    setIsSimulatingRain,
    resetReservoirLevels,
    reservoirs,
    selectedReservoirId,
    setSelectedReservoirId
  } = useContingencia();

  const esp = selectedReservoir.esp32Device;

  // Percentage calculations
  const normalLimitPct = Math.round((selectedReservoir.normalThresholdMeters / selectedReservoir.maxDepthMeters) * 100);
  const cautionLimitPct = Math.round((selectedReservoir.cautionThresholdMeters / selectedReservoir.maxDepthMeters) * 100);
  const criticalLimitPct = Math.round((selectedReservoir.criticalThresholdMeters / selectedReservoir.maxDepthMeters) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
      
      {/* Header with ESP32 Device Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-sm text-slate-900">
                {selectedReservoir.name}
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                DATOS SIMULADOS
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              ID: {esp.deviceId} &middot; MAC: {esp.macAddress} &middot; {esp.sensorType}
            </p>
          </div>
        </div>

        {/* ESP32 Hardware Health Chips */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 font-mono">
            <Battery className="w-3.5 h-3.5 text-emerald-600" />
            <span>{esp.batteryPercentage}%</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 font-mono">
            <Wifi className="w-3.5 h-3.5 text-sky-600" />
            <span>{esp.wifiSignalDbm} dBm</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-medium">
            <Activity className="w-3 h-3 text-emerald-600" />
            <span>Conectado</span>
          </div>
        </div>
      </div>

      {/* Main Hydrological Telemetry Gauge & Thresholds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        
        {/* Metric 1: Current Level */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
            Cota de Agua Actual
          </span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-3xl font-bold font-mono tabular-nums text-slate-900">
              {selectedReservoir.currentLevelMeters}
            </span>
            <span className="text-sm font-medium text-slate-500">
              / {selectedReservoir.maxDepthMeters} m
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-600">
            Capacidad: <strong>{selectedReservoir.capacityPercentage}%</strong> del vaso de retención
          </div>
        </div>

        {/* Metric 2: Threshold Status with Indicator Bar */}
        <div className="md:col-span-2 p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">
              Umbrales Técnicos Calibrados:
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              selectedReservoir.status === 'critico' ? 'bg-red-100 text-red-800' :
              selectedReservoir.status === 'precaucion' ? 'bg-amber-100 text-amber-800' :
              'bg-emerald-100 text-emerald-800'
            }`}>
              {selectedReservoir.status === 'critico' ? 'Alerta Crítica' :
               selectedReservoir.status === 'precaucion' ? 'Aviso Precaución' : 'Operación Normal'}
            </span>
          </div>

          {/* Visual Progress Bar with Threshold Markers */}
          <div className="relative w-full h-5 bg-slate-200 rounded-full overflow-hidden">
            <div 
              style={{ width: `${selectedReservoir.capacityPercentage}%` }}
              className={`h-full transition-all duration-700 ${
                selectedReservoir.status === 'critico' ? 'bg-red-500' :
                selectedReservoir.status === 'precaucion' ? 'bg-amber-500' :
                'bg-sky-500'
              }`}
            />
            {/* Caution Threshold line */}
            <div 
              style={{ left: `${cautionLimitPct}%` }}
              className="absolute top-0 bottom-0 w-0.5 bg-amber-600 z-10"
              title={`Umbral Precaución: ${selectedReservoir.cautionThresholdMeters}m`}
            />
            {/* Critical Threshold line */}
            <div 
              style={{ left: `${criticalLimitPct}%` }}
              className="absolute top-0 bottom-0 w-0.5 bg-red-600 z-10"
              title={`Umbral Crítico: ${selectedReservoir.criticalThresholdMeters}m`}
            />
          </div>

          <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-1">
            <span>0m (Seco)</span>
            <span>Normal: &le;{selectedReservoir.normalThresholdMeters}m</span>
            <span className="text-amber-700 font-semibold">Precaución: {selectedReservoir.cautionThresholdMeters}m</span>
            <span className="text-red-700 font-semibold">Crítico: {selectedReservoir.criticalThresholdMeters}m</span>
          </div>
        </div>

      </div>

      {/* Real-time Readings Timeline Mini Chart */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-sky-600" />
            <span>Registro Histórico Continuo (ESP32 Telemetry Engine):</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Últimas lecturas</span>
        </div>

        <div className="h-20 w-full flex items-end gap-1.5 pt-2">
          {selectedReservoir.readingsHistory.map((reading, i) => {
            const heightPct = Math.max(15, Math.min(100, Math.round((reading.levelMeters / selectedReservoir.maxDepthMeters) * 100)));
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div 
                  style={{ height: `${heightPct}%` }}
                  className={`w-full rounded-t transition-all ${
                    reading.levelMeters >= selectedReservoir.criticalThresholdMeters ? 'bg-red-500' :
                    reading.levelMeters >= selectedReservoir.cautionThresholdMeters ? 'bg-amber-500' :
                    'bg-sky-500/80 group-hover:bg-sky-600'
                  }`}
                />
                <span className="text-[9px] font-mono text-slate-400 truncate">
                  {reading.timestamp.slice(0, 5)}
                </span>
                {/* Tooltip on hover */}
                <div className="absolute bottom-full mb-1 px-1.5 py-0.5 rounded bg-slate-900 text-white text-[9px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                  {reading.levelMeters}m ({reading.capacityPercentage}%)
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Simulation Controls (Essential for testing and demonstration) */}
      <div className="p-3.5 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl text-white space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-bold tracking-tight">
              Controles de Simulación de Campo (Demostración de Crecida):
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            Prototipo Etapa 1
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          
          <button
            onClick={() => triggerSimulatedRain(selectedReservoir.id, 1.8)}
            className="py-2 px-3 rounded-lg bg-sky-600/90 hover:bg-sky-600 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>Lluvia Torrencial (+1.8m)</span>
          </button>

          <button
            onClick={() => triggerDrain(selectedReservoir.id, 1.0)}
            className="py-2 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <ArrowDown className="w-3.5 h-3.5 text-emerald-400" />
            <span>Abrir Compuerta (-1.0m)</span>
          </button>

          <button
            onClick={() => setIsSimulatingRain(!isSimulatingRain)}
            className={`py-2 px-3 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs ${
              isSimulatingRain 
                ? 'bg-rose-600 text-white font-bold animate-pulse' 
                : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{isSimulatingRain ? 'Tormenta en Curso' : 'Lluvia Continua'}</span>
          </button>

          <button
            onClick={resetReservoirLevels}
            className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer Niveles</span>
          </button>

        </div>
      </div>

    </div>
  );
};
