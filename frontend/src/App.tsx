import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { User, Role } from './types';
import { Gender } from './types'; 

// Components
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import Dashboard from './pages/Dashboard';
import FinancePage from './pages/FinancePage';
import TrainingPage from './pages/TrainingPage';
import AttendancePage from './pages/AttendancePage';
import ProfilePage from './pages/ProfilePage';
import AdminManagement from './pages/AdminManagement';


const Navbar: React.FC<{ user: User | null; onLogout: () => void }> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  return (
    <nav className="bg-emerald-900 text-white shadow-lg sticky top-0 z-50 border-b border-emerald-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-3">
              <img src="/src/imgs/504334574_17920031589101995_729957981761403041_n.png" alt="Elysius Logo" className="h-10 w-10 rounded-full border border-amber-500/50" />
              <span className="font-bold text-xl tracking-tight text-emerald-50">Elysius Voleibol</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-800 transition">Início</Link>
                <Link to="/financeiro" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-800 transition">Financeiro</Link>
                <Link to="/treinos" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-800 transition">Cronograma</Link>
                <Link to="/presenca" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-800 transition">Presença</Link>
                {user.role === Role.TREINADOR && (
                  <Link to="/admin" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-800 transition">Administração</Link>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <Link to="/perfil" className="flex items-center space-x-2 text-sm font-medium hover:text-emerald-200 transition">
                <div className="bg-emerald-800 p-1 rounded-full">
                  <i className="fas fa-user-circle text-xl text-emerald-100"></i>
                </div>
                <span>{user.name}</span>
              </Link>
              <button 
                onClick={onLogout}
                className="bg-emerald-950 p-1 px-3 rounded-full hover:bg-black transition flex items-center space-x-2 text-emerald-100 border border-emerald-800"
              >
                <i className="fas fa-sign-out-alt"></i>
                <span>Sair</span>
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-emerald-200 hover:text-white hover:bg-emerald-800 focus:outline-none"
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-emerald-900 pb-3 pt-2 px-2 space-y-1 sm:px-3">
          <Link onClick={() => setIsOpen(false)} to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-800">Início</Link>
          <Link onClick={() => setIsOpen(false)} to="/financeiro" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-800">Financeiro</Link>
          <Link onClick={() => setIsOpen(false)} to="/treinos" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-800">Cronograma</Link>
          <Link onClick={() => setIsOpen(false)} to="/presenca" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-800">Presença</Link>
          {user.role === Role.TREINADOR && (
            <Link onClick={() => setIsOpen(false)} to="/admin" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-800">Administração</Link>
          )}
          <Link onClick={() => setIsOpen(false)} to="/perfil" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-800">Perfil</Link>
          <button onClick={onLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-800 text-red-300">Sair</button>
        </div>
      )}
    </nav>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('elysius_user');
    
    // Dados para simular o sistema funcionando sem backend
    const usuarioSimulado: User = {
      id: '1',
      name: 'Janiele (Admin)',
      email: 'admin@elysius.com',
      role: Role.TREINADOR,
      cpf: '000.000.000-00', // Campo adicionado
      phone: '(85) 99999-9999', // Campo adicionado
      gender: Gender.FEMININO // Campo adicionado (ajuste se for sigla como 'F' ou 'M')
    };

    if (savedUser && savedUser !== "undefined" && savedUser !== "") {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        // Se o JSON estiver quebrado (erro que você teve), ele entra aqui
        setUser(usuarioSimulado);
      }
    } else {
      // Força o usuário simulado se não houver ninguém logado
      setUser(usuarioSimulado);
    }
    setLoading(false);
  }, []);

  const handleLogin = (u: User, token: string) => {
    setUser(u);
    localStorage.setItem('elysius_user', JSON.stringify(u));
    localStorage.setItem('elysius_token', token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('elysius_user');
    localStorage.removeItem('elysius_token');
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-emerald-50">
      <i className="fas fa-circle-notch fa-spin text-4xl text-emerald-800"></i>
    </div>
  );

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-emerald-50/30">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-grow container mx-auto p-4 md:p-8">
          <Routes>
            <Route path="/login" element={!user ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/" />} />
            <Route path="/cadastro" element={!user ? <RegistrationPage /> : <Navigate to="/" />} />
            <Route path="/" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
            <Route path="/financeiro" element={user ? <FinancePage user={user} /> : <Navigate to="/login" />} />
            <Route path="/treinos" element={user ? <TrainingPage user={user} /> : <Navigate to="/login" />} />
            <Route path="/presenca" element={user ? <AttendancePage user={user} /> : <Navigate to="/login" />} />
            <Route path="/perfil" element={user ? <ProfilePage user={user} /> : <Navigate to="/login" />} />
            <Route path="/admin" element={user?.role === Role.TREINADOR ? <AdminManagement /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-emerald-100 p-4 text-center text-emerald-800/60 text-sm">
          &copy; {new Date().getFullYear()} Elysius Voleibol. Força e Honra.
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;