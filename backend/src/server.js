// src/server.js
import express from 'express';
import dotenv from 'dotenv';
import { initDB } from './db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

export async function createServer() {
  await initDB();
  const app = express();
  app.use(express.json());
  app.use('/register', authRoutes);  
  return app;
}

// Lancer le serveur uniquement si ce n'est pas un test
export async function startServer() {
  const app = await createServer();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

if (process.env.NODE_ENV !== 'test') {
  startServer();
}
