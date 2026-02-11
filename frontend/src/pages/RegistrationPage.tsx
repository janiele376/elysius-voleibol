
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
    <div className="max-w-xl mx-auto mt-8 md:mt-12 mb-12">
      <div className="bg-white p-8 rounded-3xl shadow-2xl border border-emerald-100">
        <div className="text-center mb-8">
          <img 
            src="https://images.squarespace-cdn.com/content/v1/64010a3a4c4e72403612d334/35761e5e-6379-4592-9976-932f913d0972/logo.png" 
            alt="Elysius Voleibol" 
            className="h-24 w-24 mx-auto mb-4 drop-shadow-md rounded-full border-2 border-amber-500"
          />
          <h1 className="text-3xl font-black text-emerald-900 tracking-tighter uppercase">Junte-se ao Time</h1>
          <p className="text-emerald-700/60 font-medium">Crie sua conta no Portal Elysius</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100 flex items-center gap-2">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
              <i className="fas fa-check"></i>
            </div>
            <h2 className="text-2xl font-black text-emerald-900 uppercase">Cadastro Realizado!</h2>
            <p className="text-emerald-700 font-medium italic">Redirecionando para o login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-emerald-950 mb-1 uppercase tracking-widest">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border-2 border-emerald-50 rounded-xl focus:ring-2 focus:ring-emerald-800 outline-none font-medium"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-emerald-950 mb-1 uppercase tracking-widest">E-mail</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border-2 border-emerald-50 rounded-xl focus:ring-2 focus:ring-emerald-800 outline-none font-medium"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-emerald-950 mb-1 uppercase tracking-widest">CPF (Obrigatório)</label>
                <input
                  type="text"
                  required
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="w-full p-3 border-2 border-emerald-50 rounded-xl focus:ring-2 focus:ring-emerald-800 outline-none font-medium"
                  placeholder="000.000.000-00"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-emerald-950 mb-1 uppercase tracking-widest">Celular (Obrigatório)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 border-2 border-emerald-50 rounded-xl focus:ring-2 focus:ring-emerald-800 outline-none font-medium"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-emerald-950 mb-1 uppercase tracking-widest">Sexo Biológico (Obrigatório)</label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => setGender(Gender.MASCULINO)}
                  className={`p-3 rounded-xl border-2 font-bold uppercase text-xs tracking-widest transition-all ${gender === Gender.MASCULINO ? 'bg-blue-600 text-white border-blue-700 shadow-md' : 'bg-emerald-50/30 text-emerald-800 border-emerald-50'}`}
                >
                  <i className="fas fa-mars mr-2"></i> Masculino
                </button>
                <button
                  type="button"
                  onClick={() => setGender(Gender.FEMININO)}
                  className={`p-3 rounded-xl border-2 font-bold uppercase text-xs tracking-widest transition-all ${gender === Gender.FEMININO ? 'bg-pink-600 text-white border-pink-700 shadow-md' : 'bg-emerald-50/30 text-emerald-800 border-emerald-50'}`}
                >
                  <i className="fas fa-venus mr-2"></i> Feminino
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-emerald-950 mb-1 uppercase tracking-widest">Senha de Acesso</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border-2 border-emerald-50 rounded-xl focus:ring-2 focus:ring-emerald-800 outline-none font-medium"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-emerald-950 mb-1 uppercase tracking-widest">Tipo de Perfil</label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => setRole(Role.ALUNO)}
                  className={`p-3 rounded-xl border-2 font-bold uppercase text-xs tracking-widest transition-all ${role === Role.ALUNO ? 'bg-emerald-800 text-white border-emerald-900 shadow-md' : 'bg-emerald-50/30 text-emerald-800 border-emerald-50'}`}
                >
                  <i className="fas fa-user-graduate mr-2"></i> Atleta / Aluno
                </button>
                <button
                  type="button"
                  onClick={() => setRole(Role.TREINADOR)}
                  className={`p-3 rounded-xl border-2 font-bold uppercase text-xs tracking-widest transition-all ${role === Role.TREINADOR ? 'bg-emerald-800 text-white border-emerald-900 shadow-md' : 'bg-emerald-50/30 text-emerald-800 border-emerald-50'}`}
                >
                  <i className="fas fa-user-tie mr-2"></i> Treinador
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-900 text-white py-4 rounded-2xl font-black hover:bg-black transition-all disabled:opacity-50 shadow-xl uppercase tracking-[0.2em] mt-6"
            >
              {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : 'Finalizar Cadastro'}
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-emerald-50 text-center">
          <p className="text-sm text-emerald-700">
            Já possui uma conta?{' '}
            <Link to="/login" className="font-bold text-emerald-900 hover:underline">
              Voltar ao Início
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
