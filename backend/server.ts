import * as dotenv from 'dotenv';
// 1. Carregar variáveis de ambiente antes de qualquer outra importação
dotenv.config();

import express from 'express';
// @ts-ignore - Ignora o erro visual de tipagem no VS Code para o Prisma 7
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';

/**
 * CONFIGURAÇÃO DEFINITIVA - PRISMA 7
 * Usamos 'log' para garantir que o construtor não esteja vazio.
 * Como você está injetando a DATABASE_URL via terminal, o Prisma 7
 * a encontrará automaticamente no ambiente do sistema.
 */
const prisma = new PrismaClient({
  log: ['info', 'query', 'warn', 'error']
});

const app = express();

// Middlewares essenciais
app.use(cors()); 
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'ELYSIUS_VOLEIBOL_GUARD_2026';

// --- ROTAS DE AUTENTICAÇÃO ---

// Registro de Usuário (Integrado com seu projeto de vôlei)
app.post('/api/register', async (req: any, res: any) => {
  const { name, email, cpf, phone, password, role, gender } = req.body;

  try {
    // Busca se o e-mail já existe
    const existingUser = await (prisma as any).user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'E-mail já cadastrado.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Cria o usuário no banco PostgreSQL
    const user = await (prisma as any).user.create({
      data: {
        name,
        email,
        cpf,
        phone,
        gender, 
        password: hashedPassword,
        role: role || 'ALUNO'
      }
    });

    res.status(201).json({ success: true, message: 'Usuário criado com sucesso.' });
  } catch (error) {
    console.error("Erro no Registro:", error);
    res.status(500).json({ error: 'Erro ao registrar usuário. Verifique se o PostgreSQL está ligado.' });
  }
});

// Login de Usuário
app.post('/api/login', async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await (prisma as any).user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Senha incorreta.' });

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name, gender: user.gender },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error("Erro no Login:", error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

// Listagem de Alunos
app.get('/api/users', async (req: any, res: any) => {
    try {
        const users = await (prisma as any).user.findMany({
            where: { role: 'ALUNO' },
            select: { 
                id: true, 
                name: true, 
                email: true, 
                role: true, 
                gender: true, 
                cpf: true, 
                phone: true 
            }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar alunos.' });
    }
});

// Inicialização do Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\n🚀 Elysius Backend ON na porta ${PORT}`);
    console.log(`📡 Conexão PostgreSQL ativa via ambiente\n`);
});