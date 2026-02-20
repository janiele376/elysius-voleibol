import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// Força o carregamento do arquivo .env
dotenv.config();

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    // Agora process.env.DATABASE_URL não estará mais vazio
    url: process.env.DATABASE_URL,
  },
});