// src/routes/authRoutes.js
import express from 'express';
import { isValidEmail, isValidPassword } from '../services/validationService.js';
import { getDB } from '../db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email)) return res.status(400).json({ error: 'Email invalide' });
  if (!isValidPassword(password)) return res.status(400).json({ error: 'Mot de passe invalide' });

  try {
    const db = getDB();
    await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    res.status(400).json({ error: 'Email déjà utilisé' });
  }
});

export default router;
