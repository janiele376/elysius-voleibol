import { User, Training, Payment, Attendance, Event, Role, Gender } from '../types';

const BASE_URL = 'http://localhost:3000/api';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('elysius_token')}`,
});

export const api = {
  // Auth
  login: async (email: string, pass: string): Promise<{ user: User, token: string }> => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Falha na autenticação');
    }
    
    const data = await response.json();
    if (data.token) localStorage.setItem('elysius_token', data.token);
    return data;
  },

  register: async (userData: any): Promise<{ success: boolean }> => {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao realizar cadastro');
    }
    
    return response.json();
  },

  // Students - Agora buscando do banco real
  getStudents: async (): Promise<User[]> => {
    const response = await fetch(`${BASE_URL}/users`, { headers: getHeaders() });
    if (!response.ok) return [];
    return response.json();
  },

  // Trainings
  getTrainings: async (): Promise<Training[]> => {
    // Aqui você pode criar a rota /api/trainings no backend depois
    return [
      { id: 't1', title: 'Fundamentos Masculino', dayOfWeek: 1, startTime: '18:00', endTime: '19:30', coachId: '1', coachName: 'Carlos', category: Gender.MASCULINO },
    ];
  },

  getPayments: async (userId?: string): Promise<Payment[]> => {
    return [
      { id: 'p1', month: 1, year: 2025, amount: 150.0, status: 'PAGO', dueDate: '2025-01-05' },
    ] as Payment[];
  },

  confirmAttendance: async (trainingId: string, status: string, justification?: string) => {
    const response = await fetch(`${BASE_URL}/attendance`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ trainingId, status, justification })
    });
    return response.json();
  },

  getEvents: async (): Promise<Event[]> => {
    return [
      { id: 'e1', title: 'Amistoso vs Vikings', type: 'AMISTOSO', date: '2025-02-15 14:00', location: 'Ginásio Central' },
    ];
  }
};