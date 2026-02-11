
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { User, Gender, Role } from '../types';

const AdminManagement: React.FC = () => {
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<'ALL' | Gender>('ALL');

  useEffect(() => {
    api.getStudents().then(setStudents).finally(() => setLoading(false));
  }, []);

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter === 'ALL' || s.gender === genderFilter;
    return matchesSearch && matchesGender;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-emerald-950 uppercase tracking-tighter">Gestão de Tropa (ADM)</h1>
          <p className="text-emerald-700 font-medium">Controle total sobre o contingente de atletas Elysius.</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-emerald-900 text-white px-6 py-3 rounded-2xl font-black hover:bg-black transition shadow-xl flex items-center gap-3 uppercase text-xs tracking-[0.2em]">
            <i className="fas fa-user-plus text-amber-500"></i>
            <span>Novo Atleta</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-grow relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-emerald-400">
              <i className="fas fa-search"></i>
            </span>
            <input 
              type="text" 
              placeholder="Buscar atleta..."
              className="w-full pl-12 pr-4 py-3 bg-emerald-50/30 border-2 border-emerald-50 rounded-2xl focus:ring-2 focus:ring-emerald-900 outline-none font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex bg-emerald-50 p-1 rounded-2xl border border-emerald-100">
            <button 
              onClick={() => setGenderFilter('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${genderFilter === 'ALL' ? 'bg-emerald-900 text-white shadow-md' : 'text-emerald-700 hover:bg-emerald-100'}`}
            >Todos</button>
            <button 
              onClick={() => setGenderFilter(Gender.MASCULINO)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${genderFilter === Gender.MASCULINO ? 'bg-blue-600 text-white shadow-md' : 'text-emerald-700 hover:bg-emerald-100'}`}
            >Masc</button>
            <button 
              onClick={() => setGenderFilter(Gender.FEMININO)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${genderFilter === Gender.FEMININO ? 'bg-pink-600 text-white shadow-md' : 'text-emerald-700 hover:bg-emerald-100'}`}
            >Fem</button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-emerald-50">
          <table className="w-full text-left">
            <thead className="bg-emerald-900 text-emerald-50 text-[10px] font-black uppercase tracking-[0.2em]">
              <tr>
                <th className="px-6 py-4">Nome de Guerra / Contato</th>
                <th className="px-6 py-4">Gênero</th>
                <th className="px-6 py-4">Prontuário Saúde</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Comandos ADM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-emerald-800"><i className="fas fa-spinner fa-spin"></i></td></tr>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map(student => (
                  <tr key={student.id} className="hover:bg-emerald-50/50 transition group">
                    <td className="px-6 py-4">
                      <p className="font-black text-emerald-950 uppercase text-sm tracking-tighter">{student.name}</p>
                      <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest italic">{student.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${student.gender === Gender.MASCULINO ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-pink-100 text-pink-700 border border-pink-200'}`}>
                        {student.gender === Gender.MASCULINO ? <i className="fas fa-mars mr-1"></i> : <i className="fas fa-venus mr-1"></i>}
                        {student.gender}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md font-black uppercase tracking-tighter border border-emerald-100">
                        {student.healthInfo || 'FICHA LIMPA'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-widest">
                        ATIVO
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                       <button className="p-2.5 text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-900 hover:text-white transition shadow-sm"><i className="fas fa-edit"></i></button>
                       <button className="p-2.5 text-red-500 bg-red-50 rounded-xl hover:bg-red-600 hover:text-white transition shadow-sm"><i className="fas fa-trash-alt"></i></button>
                       <button className="p-2.5 text-amber-600 bg-amber-50 rounded-xl hover:bg-amber-500 hover:text-white transition shadow-sm"><i className="fas fa-file-invoice"></i></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} className="p-8 text-center text-emerald-300">Nenhum atleta encontrado com estes filtros.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
