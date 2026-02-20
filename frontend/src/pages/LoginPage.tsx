import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Role, Gender } from '../types';

interface LoginPageProps {
  onLogin: (user: User, token: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [activeRole, setActiveRole] = useState<Role>(Role.ALUNO);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // SIMULAÇÃO: Criamos um pequeno atraso para simular uma resposta de rede
    setTimeout(() => {
      try {
        // Criamos o objeto de usuário baseado na Role selecionada no seletor
        const usuarioSimulado: User = {
          id: activeRole === Role.TREINADOR ? '1' : '2',
          name: activeRole === Role.TREINADOR ? 'Janiele (Admin)' : 'Atleta Teste',
          email: email,
          role: activeRole,
          cpf: '000.000.000-00',
          phone: '(85) 99999-9999',
          gender: Gender.FEMININO 
        };

        // Chama a função onLogin com os dados simulados, evitando o erro de JSON.parse
        onLogin(usuarioSimulado, "token-de-teste-12345");
        
      } catch (err: any) {
        setError('Ocorreu um erro ao processar o acesso simulado.');
      } finally {
        setLoading(false);
      }
    }, 800); 
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed m-0 p-0"
      style={{ 
        backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.45), rgba(6, 78, 59, 0.65)), url('/src/imgs/WhatsApp Image 2026-02-11 at 09.40.04 - Edited.jpg')`,
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        width: '100vw'
      }}
    >
      <div className="max-w-md w-full px-4 my-12 animate-fadeIn">
        {/* Logo e Título Externo */}
        <div className="text-center mb-8">
          <img 
            src="/src/imgs/504334574_17920031589101995_729957981761403041_n.png" 
            alt="Elysius Voleibol" 
            className="h-28 w-28 mx-auto mb-4 drop-shadow-2xl rounded-full border-4 border-amber-500 bg-white"
          />
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase drop-shadow-lg">Elysius</h1>
          <p className="text-emerald-50 font-bold uppercase text-[10px] tracking-[0.3em]">Portal de Performance</p>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-emerald-50 overflow-hidden">
          {/* Seletor de Opção de Login */}
          <div className="flex p-2 bg-emerald-50/50 border-b border-emerald-100">
            <button 
              type="button"
              onClick={() => setActiveRole(Role.ALUNO)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeRole === Role.ALUNO ? 'bg-emerald-900 text-white shadow-lg' : 'text-emerald-700 hover:bg-emerald-100'}`}
            >
              <i className="fas fa-volleyball-ball"></i>
              Atleta
            </button>
            <button 
              type="button"
              onClick={() => setActiveRole(Role.TREINADOR)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeRole === Role.TREINADOR ? 'bg-emerald-900 text-white shadow-lg' : 'text-emerald-700 hover:bg-emerald-100'}`}
            >
              <i className="fas fa-user-tie"></i>
              Treinador
            </button>
          </div>

          <div className="p-8">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-black text-emerald-900 uppercase tracking-tight">
                Acesso {activeRole === Role.ALUNO ? 'do Aluno' : 'da Comissão'}
              </h2>
              <p className="text-xs text-emerald-500 font-medium">Insira seus dados para entrar na quadra digital</p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs mb-6 flex items-center space-x-2 border border-red-100 animate-slideDown">
                <i className="fas fa-exclamation-triangle"></i>
                <span className="font-bold">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-emerald-900 mb-1 uppercase tracking-[0.2em]">E-mail de Cadastro</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-emerald-300">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 bg-emerald-50/30 border-2 border-emerald-50 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none font-medium placeholder-emerald-200"
                    placeholder="exemplo@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-emerald-900 mb-1 uppercase tracking-[0.2em]">Senha de Segurança</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-emerald-300">
                    <i className="fas fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 bg-emerald-50/30 border-2 border-emerald-50 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none font-medium placeholder-emerald-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-900 text-white py-4 rounded-2xl font-black hover:bg-black transition-all shadow-xl disabled:opacity-50 uppercase tracking-[0.2em] relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Entrar no Sistema'}
                </span>
                <div className="absolute inset-0 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-10"></div>
              </button>
            </form>

            <div className="mt-10 pt-6 border-t border-emerald-50 text-center space-y-4">
              <p className="text-sm text-emerald-700 font-medium">
                Ainda não faz parte da Elysius?
              </p>
              <Link 
                to="/cadastro" 
                className="inline-block w-full py-3.5 border-2 border-emerald-100 text-emerald-900 rounded-2xl font-black hover:bg-emerald-50 hover:border-emerald-200 transition-all uppercase text-[10px] tracking-[0.2em]"
              >
                <i className="fas fa-user-plus mr-2 text-amber-500"></i>
                Criar Nova Conta
              </Link>
            </div>
          </div>
        </div>
        
        <p className="text-center mt-12 text-[10px] font-black text-white uppercase tracking-[0.5em] drop-shadow-lg">
          Força &bull; Honra &bull; Excelência
        </p>
      </div>
    </div>
  );
};

export default LoginPage;