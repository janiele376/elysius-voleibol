
import React from 'react';
import { User, Role, Gender } from '../types';

const ProfilePage: React.FC<{ user: User }> = ({ user }) => {
  const isStudent = user.role === Role.ALUNO;

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-emerald-100">
        <div className="h-40 bg-emerald-900 flex items-end justify-center relative">
          <div className="absolute inset-0 opacity-10 flex items-center justify-center overflow-hidden">
             <i className="fas fa-volleyball-ball text-[15rem] rotate-12"></i>
          </div>
          <div className="w-28 h-28 bg-white rounded-full border-4 border-amber-500 shadow-2xl translate-y-14 flex items-center justify-center relative z-10 overflow-hidden">
            <i className={`fas ${user.gender === Gender.FEMININO ? 'fa-female' : 'fa-male'} text-5xl text-emerald-100`}></i>
            <img src="/src/imgs/504334574_17920031589101995_729957981761403041_n.png" alt="Overlay" className="absolute inset-0 opacity-10" />
          </div>
        </div>
        
        <div className="mt-16 p-8 text-center space-y-2">
          <h1 className="text-3xl font-black text-emerald-950 uppercase tracking-tighter">{user.name}</h1>
          <div className="flex justify-center gap-2">
            <p className="bg-emerald-800 text-emerald-50 font-black px-4 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
              <i className={`fas ${isStudent ? 'fa-user-graduate' : 'fa-user-tie'} text-amber-400`}></i>
              {user.role} Elysius
            </p>
            <p className={`font-black px-4 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] border flex items-center gap-2 ${user.gender === Gender.MASCULINO ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-pink-50 text-pink-800 border-pink-200'}`}>
              <i className={`fas ${user.gender === Gender.MASCULINO ? 'fa-mars' : 'fa-venus'}`}></i>
              {user.gender}
            </p>
          </div>
          <p className="text-emerald-700 font-medium italic">{user.email}</p>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-emerald-50 bg-emerald-50/10">
          <section className="space-y-4">
            <h3 className="font-black text-emerald-950 flex items-center gap-2 border-b border-emerald-100 pb-2 uppercase text-sm tracking-widest">
              <i className="fas fa-id-card text-emerald-600"></i> Dados de Registro
            </h3>
            <div className="space-y-2">
              <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest">CPF: <span className="text-emerald-950">{user.cpf || '***.***.***-**'}</span></p>
              <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest">CEL: <span className="text-emerald-950">{user.phone || '(00) 00000-0000'}</span></p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="font-black text-emerald-950 flex items-center gap-2 border-b border-emerald-100 pb-2 uppercase text-sm tracking-widest">
              <i className="fas fa-phone-alt text-emerald-600"></i> Contatos de Emergência
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-white p-3.5 rounded-xl border border-emerald-50 shadow-sm">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Responsável</span>
                <span className="text-sm font-black text-emerald-950">{user.responsibleName || 'PRÓPRIO'}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
