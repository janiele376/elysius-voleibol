
import React, { useEffect, useState } from 'react';
import { User, Role, Event } from '../types';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getEvents().then(setEvents).finally(() => setLoading(false));
  }, []);

  const isCoach = user.role === Role.TREINADOR;

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>         
          <h1 className="text-3xl font-extrabold text-emerald-950">Salve, {user.name}!</h1>
          <p className="text-emerald-700 font-medium">Bem-vindo ao centro de comando Elysius.</p>
        </div>
        <div className="flex gap-2">
           <Link to="/presenca" className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg font-bold hover:bg-emerald-200 transition border border-emerald-200">
             Confirmar Presença
           </Link>
           {isCoach && (
             <Link to="/admin" className="bg-emerald-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-emerald-900 transition shadow-md">
               Gerenciar Alunos
             </Link>
           )}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 flex items-center space-x-4">
          <div className="bg-emerald-50 p-3 rounded-xl text-emerald-700 border border-emerald-100">
            <i className="fas fa-calendar-check text-2xl"></i>
          </div>
          <div>
            <p className="text-sm text-emerald-600 font-bold uppercase tracking-tighter">Próximo Treino</p>
            <p className="text-lg font-bold text-emerald-950">Segunda, 18:00</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 flex items-center space-x-4">
          <div className="bg-amber-50 p-3 rounded-xl text-amber-600 border border-amber-100">
            <i className="fas fa-wallet text-2xl"></i>
          </div>
          <div>
            <p className="text-sm text-amber-700 font-bold uppercase tracking-tighter">Mensalidade</p>
            <p className="text-lg font-bold text-emerald-950">Pendente (Dezembro)</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 flex items-center space-x-4">
          <div className="bg-emerald-900 p-3 rounded-xl text-emerald-50">
            <i className="fas fa-trophy text-2xl"></i>
          </div>
          <div>
            <p className="text-sm text-emerald-800 font-bold uppercase tracking-tighter">Competições</p>
            <p className="text-lg font-bold text-emerald-950">{events.length} amistosos</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar / Events */}
        <section className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
          <div className="p-6 border-b border-emerald-50 flex justify-between items-center bg-emerald-50/20">
            <h2 className="text-xl font-bold text-emerald-900">Calendário de Amistosos</h2>
            <Link to="/treinos" className="text-emerald-700 text-sm font-bold hover:underline">Ver todos</Link>
          </div>
          <div className="p-0">
            {loading ? (
              <div className="p-8 text-center text-emerald-600"><i className="fas fa-spinner fa-spin"></i></div>
            ) : events.length > 0 ? (
              <ul className="divide-y divide-emerald-50">
                {events.map(event => (
                  <li key={event.id} className="p-4 hover:bg-emerald-50/50 transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-emerald-900">{event.title}</h3>
                        <p className="text-sm text-emerald-600 flex items-center gap-2">
                          <i className="fas fa-map-marker-alt"></i> {event.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="bg-emerald-800 text-emerald-50 text-xs px-2 py-1 rounded-full font-bold uppercase">{event.type}</span>
                        <p className="text-sm font-black text-emerald-950 mt-1">{new Date(event.date).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-emerald-300">Nenhum amistoso registrado.</div>
            )}
          </div>
        </section>

        {/* Notices */}
        <section className="bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-2xl p-8 text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <i className="fas fa-volleyball-ball text-9xl"></i>
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-amber-400">
              <i className="fas fa-bullhorn"></i> Avisos Importantes
            </h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="bg-emerald-700/50 p-2 rounded-lg h-fit"><i className="fas fa-info-circle text-amber-400"></i></div>
                <p className="text-emerald-50">O pagamento da mensalidade de Dezembro deve ser efetuado até o dia <b>05/12</b> para evitar o status "Em Atraso".</p>
              </li>
              <li className="flex gap-3">
                <div className="bg-emerald-700/50 p-2 rounded-lg h-fit"><i className="fas fa-exclamation-triangle text-amber-400"></i></div>
                <p className="text-emerald-50 font-medium">Não haverá treino na próxima sexta-feira devido ao feriado nacional.</p>
              </li>
            </ul>
          </div>
          <div className="mt-8 relative z-10">
             <button className="bg-amber-500 text-emerald-950 px-6 py-2 rounded-xl font-black hover:bg-amber-400 transition shadow-lg uppercase tracking-tighter">
               Detalhes do Clube
             </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
