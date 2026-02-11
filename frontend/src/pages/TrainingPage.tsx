
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Training, Gender, Role } from '../types';

const DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

const TrainingPage: React.FC<{ user: any }> = ({ user }) => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    api.getTrainings().then(data => {
      // Se for aluno, filtra pelo gênero dele
      if (user.role === Role.ALUNO) {
        setTrainings(data.filter(t => t.category === user.gender || t.category === Gender.MISTO));
      } else {
        setTrainings(data);
      }
    }).finally(() => setLoading(false));
  }, [user]);

  const isCoach = user.role === Role.TREINADOR;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-emerald-950 uppercase tracking-tighter">Cronograma {isCoach ? 'Geral' : `Categoria ${user.gender}`}</h1>
          <p className="text-emerald-700 font-medium">Frequência e disciplina levam à glória.</p>
        </div>
        {isCoach && (
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-emerald-900 text-white px-5 py-2.5 rounded-xl font-black hover:bg-black transition shadow-lg flex items-center gap-2 uppercase text-xs tracking-widest"
          >
            <i className="fas fa-calendar-plus text-amber-500"></i> Postar Novo Treino
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center"><i className="fas fa-spinner fa-spin text-3xl text-emerald-800"></i></div>
        ) : (
          [1, 2, 3, 4, 5, 6].map(dayIdx => {
            const dayTrainings = trainings.filter(t => t.dayOfWeek === dayIdx);
            return (
              <div key={dayIdx} className="bg-white rounded-3xl shadow-sm border border-emerald-100 flex flex-col h-full overflow-hidden">
                <div className="p-4 bg-emerald-900 text-white border-b border-emerald-800 text-center">
                  <h3 className="font-black uppercase text-xs tracking-[0.2em]">{DAYS[dayIdx]}</h3>
                </div>
                <div className="p-4 flex-grow space-y-4 bg-emerald-50/20">
                  {dayTrainings.length > 0 ? (
                    dayTrainings.map(t => (
                      <div key={t.id} className="p-4 bg-white rounded-2xl border-2 border-emerald-100 hover:border-emerald-600 transition group cursor-pointer shadow-sm relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-1.5 h-full ${t.category === Gender.MASCULINO ? 'bg-blue-500' : t.category === Gender.FEMININO ? 'bg-pink-500' : 'bg-emerald-500'}`}></div>
                        <div className="flex justify-between items-start mb-2">
                           <span className="text-[10px] font-black text-white bg-emerald-800 px-2 py-0.5 rounded-md uppercase tracking-widest">
                             {t.startTime}
                           </span>
                           {isCoach && (
                             <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                               <button className="p-1 text-emerald-600 hover:text-emerald-950"><i className="fas fa-edit text-xs"></i></button>
                               <button className="p-1 text-red-500 hover:text-red-900"><i className="fas fa-trash-alt text-xs"></i></button>
                             </div>
                           )}
                        </div>
                        <h4 className="font-black text-emerald-950 uppercase tracking-tighter text-sm mb-1">{t.title}</h4>
                        <div className="flex items-center justify-between mt-2 border-t border-emerald-50 pt-2">
                          <p className="text-[9px] text-emerald-600 font-black uppercase tracking-widest">Coach {t.coachName}</p>
                          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border uppercase ${t.category === Gender.MASCULINO ? 'border-blue-200 text-blue-600 bg-blue-50' : 'border-pink-200 text-pink-600 bg-pink-50'}`}>
                            {t.category}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 opacity-10">
                      <i className="fas fa-shield-blank text-3xl mb-2 text-emerald-900"></i>
                      <p className="text-[10px] font-black uppercase tracking-widest">Folga</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-emerald-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scaleIn">
            <h2 className="text-2xl font-black text-emerald-900 uppercase tracking-tighter mb-6 flex items-center gap-2">
              <i className="fas fa-plus-circle text-amber-500"></i> Novo Treino
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-emerald-950 uppercase mb-1">Título da Sessão</label>
                <input type="text" className="w-full p-3 border-2 border-emerald-50 rounded-xl outline-none focus:ring-2 focus:ring-emerald-800" placeholder="Ex: Fundamentos de Saque" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-emerald-950 uppercase mb-1">Horário</label>
                  <input type="time" className="w-full p-3 border-2 border-emerald-50 rounded-xl outline-none focus:ring-2 focus:ring-emerald-800" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-emerald-950 uppercase mb-1">Categoria</label>
                  <select className="w-full p-3 border-2 border-emerald-50 rounded-xl outline-none focus:ring-2 focus:ring-emerald-800 bg-white">
                    <option value={Gender.MASCULINO}>Masculino</option>
                    <option value={Gender.FEMININO}>Feminino</option>
                    <option value={Gender.MISTO}>Misto</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 border-2 border-emerald-100 rounded-xl font-bold text-emerald-800 uppercase text-xs tracking-widest hover:bg-emerald-50 transition">Cancelar</button>
                <button className="flex-1 py-3 bg-emerald-900 text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-lg hover:bg-black transition">Publicar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingPage;
