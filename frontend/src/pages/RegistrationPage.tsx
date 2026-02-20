import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Role, Gender } from '../types';

const RegistrationPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.MASCULINO);
  const [role, setRole] = useState<Role>(Role.ALUNO);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await api.register({ name, email, cpf, phone, password, role, gender });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.message || 'Erro ao realizar cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed m-0 p-0 overflow-x-hidden"
      style={{ 
        backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.45), rgba(6, 78, 59, 0.65)), url('/src/imgs/WhatsApp Image 2026-02-11 at 09.40.04 - Edited.jpg')`,
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        width: '100vw'
      }}
    >
      <div className="max-w-xl w-full px-4 my-12 animate-fadeIn">
        
        {/* Logo e Título Externo */}
        <div className="text-center mb-8">
          <img 
            src="/src/imgs/504334574_17920031589101995_729957981761403041_n.png" 
            alt="Elysius Voleibol" 
            className="h-24 w-24 mx-auto mb-4 drop-shadow-2xl rounded-full border-4 border-amber-500 bg-white"
          />
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase drop-shadow-lg">Elysius</h1>
          <p className="text-emerald-50 font-bold uppercase text-[10px] tracking-[0.3em]">Portal de Performance</p>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-emerald-50 overflow-hidden p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-emerald-900 tracking-tighter uppercase">Junte-se ao Time</h2>
            <p className="text-emerald-700/60 font-medium">Crie sua conta no Portal Elysius</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 border border-red-100 flex items-center gap-2 animate-slideDown">
              <i className="fas fa-exclamation-circle"></i>
              <span className="font-bold">{error}</span>
            </div>
          )}

          {success ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner">
                <i className="fas fa-check"></i>
              </div>
              <h2 className="text-2xl font-black text-emerald-900 uppercase">Cadastro Realizado!</h2>
              <p className="text-emerald-700 font-medium italic">Redirecionando para o login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black text-emerald-950 mb-1 uppercase tracking-widest">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3.5 bg-emerald-50/30 border-2 border-emerald-50 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none font-medium transition-all"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-emerald-950 mb-1 uppercase tracking-widest">E-mail</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3.5 bg-emerald-50/30 border-2 border-emerald-50 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none font-medium transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black text-emerald-950 mb-1 uppercase tracking-widest">CPF (Obrigatório)</label>
                  <input
                    type="text"
                    required
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="w-full p-3.5 bg-emerald-50/30 border-2 border-emerald-50 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none font-medium transition-all"
                    placeholder="000.000.000-00"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-emerald-950 mb-1 uppercase tracking-widest">Celular (Obrigatório)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3.5 bg-emerald-50/30 border-2 border-emerald-50 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none font-medium transition-all"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-emerald-950 mb-1 uppercase tracking-widest">Sexo Biológico (Obrigatório)</label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setGender(Gender.MASCULINO)}
                    className={`p-3.5 rounded-2xl border-2 font-black uppercase text-[10px] tracking-widest transition-all ${gender === Gender.MASCULINO ? 'bg-blue-600 text-white border-blue-700 shadow-lg' : 'bg-emerald-50/50 text-emerald-800 border-emerald-100'}`}
                  >
                    <i className="fas fa-mars mr-2"></i> Masculino
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender(Gender.FEMININO)}
                    className={`p-3.5 rounded-2xl border-2 font-black uppercase text-[10px] tracking-widest transition-all ${gender === Gender.FEMININO ? 'bg-pink-600 text-white border-pink-700 shadow-lg' : 'bg-emerald-50/50 text-emerald-800 border-emerald-100'}`}
                  >
                    <i className="fas fa-venus mr-2"></i> Feminino
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-emerald-950 mb-1 uppercase tracking-widest">Senha de Acesso</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3.5 bg-emerald-50/30 border-2 border-emerald-50 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none font-medium transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-emerald-950 mb-1 uppercase tracking-widest">Tipo de Perfil</label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setRole(Role.ALUNO)}
                    className={`p-3.5 rounded-2xl border-2 font-black uppercase text-[10px] tracking-widest transition-all ${role === Role.ALUNO ? 'bg-emerald-900 text-white border-emerald-950 shadow-lg' : 'bg-emerald-50/50 text-emerald-800 border-emerald-100'}`}
                  >
                    <i className="fas fa-user-graduate mr-2"></i> Atleta
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole(Role.TREINADOR)}
                    className={`p-3.5 rounded-2xl border-2 font-black uppercase text-[10px] tracking-widest transition-all ${role === Role.TREINADOR ? 'bg-emerald-900 text-white border-emerald-950 shadow-lg' : 'text-emerald-800 border-emerald-100'}`}
                  >
                    <i className="fas fa-user-tie mr-2"></i> Treinador
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-900 text-white py-4 rounded-2xl font-black hover:bg-black transition-all shadow-xl disabled:opacity-50 uppercase tracking-[0.2em] mt-6 group relative overflow-hidden"
              >
                <span className="relative z-10">
                  {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : 'Finalizar Cadastro'}
                </span>
                <div className="absolute inset-0 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-10"></div>
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-emerald-50 text-center">
            <p className="text-sm text-emerald-700 font-medium">
              Já possui uma conta?{' '}
              <Link to="/login" className="font-black text-emerald-900 hover:text-amber-600 transition-colors uppercase text-[10px] tracking-widest">
                Voltar ao Início
              </Link>
            </p>
          </div>
        </div>

        {/* Lema em Branco para combinar com o Login */}
        <p className="text-center mt-12 text-[10px] font-black text-white uppercase tracking-[0.5em] drop-shadow-lg">
          Força &bull; Honra &bull; Excelência
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;