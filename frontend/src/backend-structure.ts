
/**
 * ELYSIUS VOLEIBOL - BACKEND (PROTOTYPE IMPLEMENTATION)
 */

import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import * as PrismaModule from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import QRCode from 'qrcode';
import nodemailer from 'nodemailer';

const prisma = new (PrismaModule as any).PrismaClient();
const app = express();
(app as any).use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'ELYSIUS_VOLEIBOL_GUARD_2025';

// --- ROTAS DE AUTENTICAÇÃO ---

app.post('/api/register', async (req: any, res: any) => {
  const { name, email, cpf, phone, password, role, gender } = req.body;

  try {
    const existingUser = await (prisma as any).user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'E-mail já cadastrado.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await (prisma as any).user.create({
      data: {
        name,
        email,
        cpf,
        phone,
        gender, // MASCULINO ou FEMININO
        password: hashedPassword,
        role: role || 'ALUNO'
      }
    });

    res.status(201).json({ success: true, message: 'Usuário criado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
});

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
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

// --- ROTAS DE TREINOS ---

app.post('/api/trainings', async (req: any, res: any) => {
  const { title, dayOfWeek, startTime, endTime, category } = req.body;
  try {
    const training = await (prisma as any).training.create({
      data: {
        title,
        dayOfWeek,
        startTime,
        endTime,
        category, // MASCULINO, FEMININO ou MISTO
        coachId: req.user.id
      }
    });
    res.status(201).json(training);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar treino.' });
  }
});

// Outras rotas permanecem omitidas por brevidade
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Elysius Backend rodando na porta ${PORT}`));
