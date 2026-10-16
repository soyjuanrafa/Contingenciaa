import React, { useState } from 'react';
import { useContingencia } from '../../context/ContingenciaContext';
import { TelemetrySensorCard } from './TelemetrySensorCard';
import { TacticalMapPanel } from './TacticalMapPanel';
import { IncidentManagementTable } from './IncidentManagementTable';
import { GreenInfrastructurePanel } from './GreenInfrastructurePanel';
import { 
  Activity, 
  Map, 
  ListFilter, 
  TreePine, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  BarChart3,
  Layers,
  Download
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { reports, reservoirs, selectedReservoir, alerts } = useContingencia();
  const [adminTab, setAdminTab] = useState<'operaciones' | 'mapa' | 'reportes' | 'eco'>('operaciones');

  const pendingReports = reports.filter(r => r.status === 'pendiente' || r.status === 'en_verificacion');
  const inAttentionReports = reports.filter(r => r.status === 'en_atencion');
  const resolvedReports = reports.filter(r => r.status === 'resuelto');
  const criticalCount = reports.filter(r => r.priority === 'urgente' || r.priority === 'alta').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        
        {/* KPI 1: Telemetría de Nivel */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Nivel Reservorio</span>
            <span className={`w-2 h-2 rounded-full ${selectedReservoir.status === 'critico' ? 'bg-red-500 animate-ping' : selectedReservoir.status === 'precaucion' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-bold font-mono tabular-nums text-slate-900">
              {selectedReservoir.currentLevelMeters}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ {selectedReservoir.maxDepthMeters}m</span>
          </div>
          <p className="text-[11px] text-slate-500 truncate mt-1">
            {selectedReservoir.name} ({selectedReservoir.capacityPercentage}%)
          </p>
        </div>

        {/* KPI 2: Incidencias Pendientes */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-[11px]">En Triaje / Pendientes</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 text-3xl font-bold font-mono tabular-nums text-amber-600">
            {pendingReports.length}
          </div>
          <p className="text-[11px] text-slate-500 truncate mt-1">
            {criticalCount} catalogadas como críticas
          </p>
        </div>

        {/* KPI 3: En Atención Cuadrillas */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Cuadrillas Despachadas</span>
            <Activity className="w-4 h-4 text-sky-500" />
          </div>
          <div className="mt-2 text-3xl font-bold font-mono tabular-nums text-sky-600">
            {inAttentionReports.length}
          </div>
          <p className="text-[11px] text-slate-500 truncate mt-1">
            Acciones de desazolve en progreso
          </p>
        </div>

        {/* KPI 4: Resueltas con éxito */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Drenajes Resueltos</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-3xl font-bold font-mono tabular-nums text-emerald-600">
            {resolvedReports.length}
          </div>
          <p className="text-[11px] text-slate-500 truncate mt-1">
            Registrados con bitácora de obra
          </p>
        </div>

      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setAdminTab('operaciones')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
              adminTab === 'operaciones'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4 text-sky-600" />
            <span>Operaciones &middot; ESP32</span>
          </button>

          <button
            onClick={() => setAdminTab('mapa')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
              adminTab === 'mapa'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Map className="w-4 h-4 text-rose-600" />
            <span>Mapa Táctico</span>
          </button>

          <button
            onClick={() => setAdminTab('reportes')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
              adminTab === 'reportes'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ListFilter className="w-4 h-4 text-indigo-600" />
            <span>Triaje Incidencias ({reports.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('eco')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
              adminTab === 'eco'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TreePine className="w-4 h-4 text-emerald-600" />
            <span>Infraestructura Verde</span>
          </button>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Centro de Mando Municipal &middot; Managua
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="space-y-6">
        {adminTab === 'operaciones' && (
          <div className="space-y-6">
            <TelemetrySensorCard />
            <IncidentManagementTable />
          </div>
        )}

        {adminTab === 'mapa' && (
          <TacticalMapPanel />
        )}

        {adminTab === 'reportes' && (
          <IncidentManagementTable />
        )}

        {adminTab === 'eco' && (
          <GreenInfrastructurePanel />
        )}
      </div>

    </div>
  );
};
