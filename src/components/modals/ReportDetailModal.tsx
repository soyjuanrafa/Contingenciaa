import React, { useState } from 'react';
import { useContingencia } from '../../context/ContingenciaContext';
import { ReportStatus } from '../../types';
import { 
  X, 
  MapPin, 
  User, 
  Phone, 
  Clock, 
  Calendar, 
  Droplets, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Send,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReportDetailModal: React.FC = () => {
  const { selectedReport, setSelectedReport, updateReportStatus } = useContingencia();
  const [newStatus, setNewStatus] = useState<ReportStatus>(selectedReport?.status || 'en_verificacion');
  const [actionNote, setActionNote] = useState('');

  if (!selectedReport) return null;

  const handleStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateReportStatus(
      selectedReport.id,
      newStatus,
      'Ing. Juan Rafael Cerna',
      'Puesto de Mando Managua',
      actionNote || `Actualización administrativa de estado a ${newStatus}.`
    );

    if (newStatus === 'resuelto') {
      try {
        confetti({ particleCount: 40, spread: 60 });
      } catch (e) {
        // ignore
      }
    }
    setActionNote('');
  };

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case 'resuelto':
        return { label: '5. Resuelto', cls: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      case 'en_atencion':
        return { label: '4. En atención', cls: 'bg-sky-50 text-sky-800 border-sky-200' };
      case 'confirmado':
        return { label: '3. Confirmado', cls: 'bg-red-50 text-red-800 border-red-200' };
      case 'en_verificacion':
        return { label: '2. En verificación', cls: 'bg-indigo-50 text-indigo-800 border-indigo-200' };
      default:
        return { label: '1. Pendiente', cls: 'bg-amber-50 text-amber-800 border-amber-200' };
    }
  };

  const badge = getStatusBadge(selectedReport.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800">
                {selectedReport.folio}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${badge.cls}`}>
                {badge.label}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              {selectedReport.title}
            </h3>
          </div>
          <button 
            onClick={() => setSelectedReport(null)}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-5 flex-1">
          
          {/* Photo and Primary Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video sm:aspect-square">
              <img 
                src={selectedReport.photoUrl} 
                alt={selectedReport.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Ubicación Reportada:
                </span>
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>{selectedReport.neighborhood} &middot; {selectedReport.zone}</span>
                </p>
                <p className="text-slate-600 text-[11px]">
                  {selectedReport.address}
                </p>
                <p className="text-[10px] font-mono text-slate-400">
                  Coords: {selectedReport.coordinates.lat.toFixed(4)}, {selectedReport.coordinates.lng.toFixed(4)}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Habitante Reportante:
                </span>
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>{selectedReport.reporterName}</span>
                </p>
                <p className="text-slate-600 font-mono text-[11px] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedReport.reporterPhone}</span>
                </p>
              </div>

              {selectedReport.waterDepthCm && (
                <div className="p-3 bg-sky-50 rounded-xl border border-sky-200/80 flex items-center justify-between">
                  <span className="text-sky-900 font-semibold flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-sky-600" />
                    <span>Lámina de Agua:</span>
                  </span>
                  <span className="text-base font-bold font-mono text-sky-700">
                    {selectedReport.waterDepthCm} cm
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Descripción del Problema
            </h4>
            <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
              {selectedReport.description}
            </p>
          </div>

          {/* Timeline Action Log (Historial de actuaciones) */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Historial y Bitácora de Actuaciones ({selectedReport.actionLog.length})</span>
            </h4>

            <div className="space-y-2">
              {selectedReport.actionLog.map(act => (
                <div key={act.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      {act.author} <span className="font-normal text-slate-500">({act.role})</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {act.timestamp}
                    </span>
                  </div>
                  <p className="text-slate-700 text-[11px]">
                    {act.note}
                  </p>
                  {act.toStatus && (
                    <span className="inline-block text-[10px] font-mono text-slate-500">
                      Transición: {act.fromStatus || 'Ingreso'} &rarr; <strong>{act.toStatus}</strong>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Municipal Update Action Form */}
          <form onSubmit={handleStatusUpdate} className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-2.5">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Registrar Acción / Actualizar Estado Oficial
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="sm:col-span-1">
                <label className="text-[10px] text-slate-600 font-medium block mb-1">Nuevo Estado:</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ReportStatus)}
                  className="w-full text-xs font-medium px-2.5 py-1.5 rounded-lg border border-amber-300 bg-white"
                >
                  <option value="pendiente">1. Pendiente</option>
                  <option value="en_verificacion">2. En verificación</option>
                  <option value="confirmado">3. Confirmado</option>
                  <option value="en_atencion">4. En atención</option>
                  <option value="resuelto">5. Resuelto</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] text-slate-600 font-medium block mb-1">Nota de la cuadrilla o técnico:</label>
                <input
                  type="text"
                  required
                  value={actionNote}
                  onChange={(e) => setActionNote(e.target.value)}
                  placeholder="Ej. Cuadrilla en sitio con camión de succión..."
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-amber-300 bg-white"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow-xs"
              >
                Guardar Actualización en Bitácora
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};
