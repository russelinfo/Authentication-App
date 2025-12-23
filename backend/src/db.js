import 'dotenv/config';
import mysql from 'mysql2/promise';

let connection = null;

export async function initDB() {
  if (connection) return connection;

  connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true, // pratique pour tests
  });

  // Création de la DB si elle n'existe pas et sélection
  await connection.query(`
    CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;
    USE \`${process.env.DB_NAME}\`;
  `);

  // Création de la table users si elle n'existe pas
  await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return connection;
}

export function getDB() {
  return connection;
}
