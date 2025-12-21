// db.js
import 'dotenv/config';
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

// Créer la base si elle n'existe pas et la table users
connection.query(
  `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``,
  (err) => {
    if (err) return console.error('❌ Erreur création DB:', err.message);

    console.log('✅ Base de données prête');

    // Se connecter à la DB
    connection.changeUser({ database: process.env.DB_NAME }, (err) => {
      if (err) return console.error('❌ Erreur sélection DB:', err.message);

      console.log('✅ Connecté à la base');

      const sql = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          first_name VARCHAR(100) NOT NULL,
          last_name VARCHAR(100) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      connection.query(sql, (err) => {
        if (err) console.error('❌ Erreur table users:', err.message);
        else console.log('✅ Table users prête');
      });
    });
  }
);

export default connection;

