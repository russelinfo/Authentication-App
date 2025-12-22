// tests/integration/register.test.js
import request from 'supertest';
import { createServer } from '../../src/server.js';
import { initDB, getDB } from '../../src/db.js';

let app;
let db;

beforeAll(async () => {
  db = await initDB();
  app = await createServer();
});

afterAll(async () => {
  if (db) await db.end(); // ferme la connexion MySQL
});

describe('POST /register', () => {
  test('Inscription réussie avec email et mot de passe valides', async () => {
    const response = await request(app)
      .post('/register')
      .send({ email: 'integration@example.com', password: 'Abcdef1!' });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Utilisateur créé avec succès');
  });

  test('Échec si email déjà utilisé', async () => {
    const response = await request(app)
      .post('/register')
      .send({ email: 'integration@example.com', password: 'Abcdef1!' });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Email déjà utilisé');
  });
});
