
import React, { useState, useEffect } from 'react';
// Import User and Training from types.ts instead of services/api.ts
import { api } from '../services/api';
import { User, Training } from '../types';

const AttendancePage: React.FC<{ user: User }> = ({ user }) => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [selectedTraining, setSelectedTraining] = useState<string>('');
  const [status, setStatus] = useState<'PRESENTE' | 'FALTA' | ''>('');
  const [justification, setJustification] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    api.getTrainings().then(setTrainings);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTraining || !status) return;

    setSubmitting(true);
    await api.confirmAttendance(selectedTraining, status, justification);
    setSubmitting(false);
    setSuccess(true);
    
    // Clear after 3 seconds
    setTimeout(() => {
      setSuccess(false);
      setSelectedTraining('');
      setStatus('');
      setJustification('');
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
      <div className="text-center">
        <h1 className="text-2xl font-black text-emerald-950 uppercase tracking-tighter">Chamada Digital</h1>
        <p className="text-emerald-700 font-medium">Sua presença é fundamental para a tática do time.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-emerald-100">
        {success ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl border-4 border-emerald-50">
              <i className="fas fa-check"></i>
            </div>
            <h2 className="text-2xl font-black text-emerald-900 uppercase">Confirmado!</h2>
            <p className="text-emerald-600 font-medium italic">"O treinamento vence o talento quando o talento não treina."</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-black text-emerald-950 mb-2 uppercase tracking-widest">Treino Alvo</label>
              <select 
                required
                value={selectedTraining}
                onChange={(e) => setSelectedTraining(e.target.value)}
                className="w-full p-3 border-2 border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-800 outline-none transition font-medium text-emerald-900"
              >
                <option value="">Selecione a sessão...</option>
                {trainings.map(t => (
                  <option key={t.id} value={t.id}>{t.title} - {t.startTime}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setStatus('PRESENTE')}
                className={`p-5 rounded-2xl border-2 flex flex-col items-center space-y-3 transition-all ${status === 'PRESENTE' ? 'border-emerald-600 bg-emerald-800 text-white shadow-lg scale-105' : 'border-emerald-50 bg-emerald-50/30 text-emerald-800 hover:border-emerald-200'}`}
              >
                <i className="fas fa-user-check text-2xl"></i>
                <span className="font-black uppercase text-xs tracking-widest">Presente</span>
              </button>
              <button
                type="button"
                onClick={() => setStatus('FALTA')}
                className={`p-5 rounded-2xl border-2 flex flex-col items-center space-y-3 transition-all ${status === 'FALTA' ? 'border-red-600 bg-red-800 text-white shadow-lg scale-105' : 'border-emerald-50 bg-emerald-50/30 text-emerald-800 hover:border-red-200'}`}
              >
                <i className="fas fa-user-times text-2xl"></i>
                <span className="font-black uppercase text-xs tracking-widest">Ausente</span>
              </button>
            </div>

            {status === 'FALTA' && (
              <div className="animate-slideDown space-y-2">
                <label className="block text-sm font-black text-emerald-950 mb-1 uppercase tracking-widest">Justificativa</label>
                <textarea
                  required
                  rows={3}
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  className="w-full p-4 border-2 border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-800 outline-none font-medium"
                  placeholder="Informe o motivo para registro ADM..."
                ></textarea>
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
                  <i className="fas fa-envelope-open-text mt-0.5"></i>
                  <p>O treinador será notificado via e-mail sobre esta ausência.</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || !selectedTraining || !status}
              className="w-full bg-emerald-900 text-white py-4 rounded-2xl font-black hover:bg-black transition disabled:opacity-50 shadow-xl uppercase tracking-[0.2em]"
            >
              {submitting ? <i className="fas fa-spinner fa-spin mr-2"></i> : 'Finalizar Registro'}
            </button>
          </form>
        )}
      </div>

      <div className="bg-emerald-950 p-6 rounded-2xl shadow-lg border border-emerald-800">
        <h3 className="font-black text-emerald-50 mb-4 flex items-center gap-2 uppercase text-sm tracking-widest">
          <i className="fas fa-history text-amber-500"></i> Histórico de Chamada
        </h3>
        <ul className="space-y-3">
          <li className="flex justify-between items-center text-sm p-3 bg-emerald-900/50 rounded-xl border border-emerald-800">
            <div>
              <p className="font-black text-emerald-50">Fundamentos I</p>
              <p className="text-emerald-400 text-xs uppercase font-bold">20 de Nov</p>
            </div>
            <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border border-emerald-500/30">Presente</span>
          </li>
          <li className="flex justify-between items-center text-sm p-3 bg-emerald-900/50 rounded-xl border border-emerald-800">
            <div>
              <p className="font-black text-emerald-50">Fundamentos I</p>
              <p className="text-emerald-400 text-xs uppercase font-bold">13 de Nov</p>
            </div>
            <span className="bg-red-500/20 text-red-400 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border border-red-500/30">Falta</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AttendancePage;
