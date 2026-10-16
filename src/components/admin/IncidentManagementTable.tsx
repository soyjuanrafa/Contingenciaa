import React, { useState } from 'react';
import { useContingencia } from '../../context/ContingenciaContext';
import { CitizenReport, ReportStatus } from '../../types';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Eye, 
  FileEdit, 
  User, 
  MapPin, 
  ArrowUpDown,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const IncidentManagementTable: React.FC = () => {
  const { reports, updateReportStatus, setSelectedReport } = useContingencia();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [districtFilter, setDistrictFilter] = useState<string>('all');
  const [editingReportId, setEditingReportId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<ReportStatus>('en_verificacion');
  const [actionNote, setActionNote] = useState('');

  // Filter logic
  const filteredReports = reports.filter(rep => {
    const matchesSearch = 
      rep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.folio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.reporterName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || rep.status === statusFilter;
    const matchesDistrict = districtFilter === 'all' || rep.zone === districtFilter;

    return matchesSearch && matchesStatus && matchesDistrict;
  });

  const handleUpdateStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReportId) return;

    updateReportStatus(
      editingReportId,
      newStatus,
      'Ing. Juan Rafael Cerna',
      'Coordinador Técnico COMUPRED',
      actionNote || `Estado actualizado a ${newStatus} en triaje municipal.`
    );

    if (newStatus === 'resuelto') {
      try {
        confetti({ particleCount: 45, spread: 60 });
      } catch (e) {
        // ignore
      }
    }

    setEditingReportId(null);
    setActionNote('');
  };

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case 'resuelto':
        return { label: '5. Resuelto', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'en_atencion':
        return { label: '4. En atención', cls: 'bg-sky-50 text-sky-700 border-sky-200' };
      case 'confirmado':
        return { label: '3. Confirmado', cls: 'bg-red-50 text-red-700 border-red-200' };
      case 'en_verificacion':
        return { label: '2. En verificación', cls: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      default:
        return { label: '1. Pendiente', cls: 'bg-amber-50 text-amber-700 border-amber-200' };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      
      {/* Table Header & Search Filter Bar */}
      <div className="p-4 border-b border-slate-200 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-display font-bold text-sm text-slate-900">
              Administración y Triaje de Incidencias Ciudadanas
            </h3>
            <p className="text-xs text-slate-500">
              Clasificación en 5 estados oficiales para evitar la desinformación en Managua.
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
            Total: {filteredReports.length} incidencias
          </span>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por folio, barrio o ciudadano..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:border-slate-400"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden cursor-pointer"
            >
              <option value="all">Todos los Estados (5 niveles)</option>
              <option value="pendiente">1. Pendiente de revisión</option>
              <option value="en_verificacion">2. En verificación</option>
              <option value="confirmado">3. Confirmado</option>
              <option value="en_atencion">4. En atención</option>
              <option value="resuelto">5. Resuelto</option>
            </select>
          </div>

          <div>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden cursor-pointer"
            >
              <option value="all">Todos los Distritos de Managua</option>
              <option value="Distrito I">Distrito I</option>
              <option value="Distrito II">Distrito II</option>
              <option value="Distrito III">Distrito III</option>
              <option value="Distrito IV">Distrito IV</option>
              <option value="Distrito V">Distrito V</option>
            </select>
          </div>
        </div>
      </div>

      {/* Edit Status Quick Modal / Inline Bar */}
      {editingReportId && (
        <div className="p-3 bg-amber-50/80 border-b border-amber-200">
          <form onSubmit={handleUpdateStatusSubmit} className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-amber-900">
              Actualizar Incidencia ({reports.find(r => r.id === editingReportId)?.folio}):
            </span>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as ReportStatus)}
              className="px-2.5 py-1.5 rounded-lg border border-amber-300 bg-white font-medium"
            >
              <option value="pendiente">1. Pendiente de revisión</option>
              <option value="en_verificacion">2. En verificación</option>
              <option value="confirmado">3. Confirmado</option>
              <option value="en_atencion">4. En atención</option>
              <option value="resuelto">5. Resuelto</option>
            </select>
            <input
              type="text"
              required
              value={actionNote}
              onChange={(e) => setActionNote(e.target.value)}
              placeholder="Nota de actuación para la bitácora (ej. Cuadrilla 4 enviada al sitio)..."
              className="flex-1 min-w-[200px] px-2.5 py-1.5 rounded-lg border border-amber-300 bg-white"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors"
            >
              Guardar en Bitácora
            </button>
            <button
              type="button"
              onClick={() => setEditingReportId(null)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>
          </form>
        </div>
      )}

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4">Folio / Fecha</th>
              <th className="py-3 px-4">Tipo &middot; Incidencia</th>
              <th className="py-3 px-4">Ubicación / Barrio</th>
              <th className="py-3 px-4">Estado Oficial</th>
              <th className="py-3 px-4">Prioridad</th>
              <th className="py-3 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {filteredReports.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">
                  No se encontraron incidencias con los filtros seleccionados.
                </td>
              </tr>
            ) : (
              filteredReports.map(rep => {
                const badge = getStatusBadge(rep.status);
                return (
                  <tr key={rep.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Folio & Date */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="font-mono font-bold text-slate-900 block">
                        {rep.folio}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {rep.timestamp}
                      </span>
                    </td>

                    {/* Title & Category */}
                    <td className="py-3 px-4 max-w-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <img 
                            src={rep.photoUrl} 
                            alt={rep.title} 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-slate-900 truncate">
                            {rep.title}
                          </h4>
                          <span className="text-[10px] text-slate-500 block truncate">
                            {rep.reporterName} ({rep.reporterPhone})
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-900 block">
                        {rep.neighborhood}
                      </span>
                      <span className="text-[11px] text-slate-500 block truncate max-w-xs">
                        {rep.address}
                      </span>
                    </td>

                    {/* 5 States */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${badge.cls}`}>
                        {badge.label}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        rep.priority === 'urgente' ? 'bg-red-100 text-red-800' :
                        rep.priority === 'alta' ? 'bg-orange-100 text-orange-800' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {rep.priority}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap space-x-1">
                      <button
                        onClick={() => setSelectedReport(rep)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                        title="Ver ficha completa y bitácora"
                      >
                        Expediente
                      </button>

                      <button
                        onClick={() => {
                          setEditingReportId(rep.id);
                          setNewStatus(rep.status);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 transition-colors"
                        title="Cambiar estado y agregar nota"
                      >
                        Cambiar Estado
                      </button>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
