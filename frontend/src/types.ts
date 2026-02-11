
export enum Role {
  ALUNO = 'ALUNO',
  TREINADOR = 'TREINADOR'
}

export enum Gender {
  MASCULINO = 'MASCULINO',
  FEMININO = 'FEMININO',
  MISTO = 'MISTO'
}

export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  gender: Gender;
  role: Role;
  healthInfo?: string;
  emergencyContact?: string;
  responsibleName?: string;
  responsiblePhone?: string;
}

export interface Training {
  id: string;
  title: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  coachId: string;
  coachName: string;
  category: Gender;
}

export interface Payment {
  id: string;
  month: number;
  year: number;
  amount: number;
  status: 'PENDENTE' | 'PAGO' | 'ATRASADO';
  dueDate: string;
  qrCode?: string;
}

export interface Attendance {
  id: string;
  trainingId: string;
  trainingTitle: string;
  date: string;
  status: 'PRESENTE' | 'FALTA' | 'JUSTIFICADO' | 'PENDENTE';
}

export interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
}
