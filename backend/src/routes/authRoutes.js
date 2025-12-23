import express from 'express';
import bcrypt from 'bcryptjs';
import { getDB } from '../db.js';

const router = express.Router();

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return typeof password === 'string' && password.length >= 6;
}

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email)) return res.status(400).json({ error: 'Email invalide' });
  if (!isValidPassword(password)) return res.status(400).json({ error: 'Mot de passe invalide' });

  const db = getDB();
  if (!db) return res.status(500).json({ error: 'Base de données non initialisée' });

  try {
    // ✅ Bien récupérer rows
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length > 0) {
      return res.status(400).json({ error: 'Email déjà utilisé' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

    return res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
