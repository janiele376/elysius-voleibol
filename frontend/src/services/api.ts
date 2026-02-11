
import { User, Training, Payment, Attendance, Event, Role, Gender } from '../types';

/**
 * Elysius API Service
 */

const BASE_URL = '/api';

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
    
    return response.json();
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

  // Students
  getStudents: async (): Promise<User[]> => {
    return [
      { id: '2', name: 'João Silva', email: 'joao@email.com', role: Role.ALUNO, gender: Gender.MASCULINO, cpf: '123', phone: '123' },
      { id: '3', name: 'Ana Oliveira', email: 'ana@email.com', role: Role.ALUNO, gender: Gender.FEMININO, cpf: '456', phone: '456' },
      { id: '4', name: 'Ricardo Santos', email: 'ricardo@email.com', role: Role.ALUNO, gender: Gender.MASCULINO, cpf: '789', phone: '789' },
    ] as User[];
  },

  // Trainings
  getTrainings: async (): Promise<Training[]> => {
    return [
      { id: 't1', title: 'Fundamentos Masculino', dayOfWeek: 1, startTime: '18:00', endTime: '19:30', coachId: '1', coachName: 'Carlos', category: Gender.MASCULINO },
      { id: 't2', title: 'Avançado Feminino', dayOfWeek: 2, startTime: '19:30', endTime: '21:00', coachId: '1', coachName: 'Carlos', category: Gender.FEMININO },
      { id: 't3', title: 'Tático Misto', dayOfWeek: 3, startTime: '19:30', endTime: '21:00', coachId: '1', coachName: 'Carlos', category: Gender.MISTO },
      { id: 't4', title: 'Reforço Masculino', dayOfWeek: 4, startTime: '17:00', endTime: '18:30', coachId: '1', coachName: 'Carlos', category: Gender.MASCULINO },
    ];
  },

  // Finance e Outros permanecem conforme arquivos anteriores...
  getPayments: async (userId?: string): Promise<Payment[]> => {
    const mockPayments: Payment[] = [
      { id: 'p1', month: 1, year: 2025, amount: 150.0, status: 'PAGO', dueDate: '2025-01-05' },
      { id: 'p2', month: 2, year: 2025, amount: 150.0, status: 'PENDENTE', dueDate: '2025-02-05' },
    ] as Payment[];
    return mockPayments;
  },

  getPaymentQRCode: async (paymentId: string): Promise<{ qrCode: string, pixCopyPaste: string }> => {
    const response = await fetch(`${BASE_URL}/payments/${paymentId}/qrcode`, {
      headers: getHeaders()
    });
    return response.json();
  },

  confirmAttendance: async (trainingId: string, status: string, justification?: string) => {
    const response = await fetch(`${BASE_URL}/attendance`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ trainingId, status, justification })
    });
    return response.json();
  },

  getAttendanceHistory: async (userId: string): Promise<Attendance[]> => {
    return [
      { id: 'a1', trainingId: 't1', trainingTitle: 'Fundamentos I', date: '2025-01-20', status: 'PRESENTE' },
    ] as Attendance[];
  },

  getEvents: async (): Promise<Event[]> => {
    return [
      { id: 'e1', title: 'Amistoso vs Vikings', type: 'AMISTOSO', date: '2025-02-15 14:00', location: 'Ginásio Central' },
    ];
  }
};
