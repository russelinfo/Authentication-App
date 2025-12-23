import { Given, When, Then, Before } from '@cucumber/cucumber';
import request from 'supertest';
import { createServer } from '../../../../src/server.js';
import { initDB } from '../../../../src/db.js';
import assert from 'assert';

let app;
let response;
let db;

/* ======================
   HOOK
====================== */

Before(async () => {
  process.env.NODE_ENV = 'test';
  db = await initDB();
  await db.query(`USE \`${process.env.DB_NAME}\``);
  await db.query('DELETE FROM users'); // DB propre avant chaque scénario
  app = await createServer();
});

/* ======================
   GIVEN
====================== */

Given('le serveur est démarré', function () {
  assert.ok(app);
});

When('il envoie une requête POST à {string} avec', async function (endpoint, dataTable) {
  const data = dataTable.hashes()[0];

  response = await request(app)
    .post(endpoint)
    .send({
      email: data.email,
      password: data.password,
    });
});


Then('la réponse a le status {int}', function (statusCode) {
  assert.strictEqual(response.statusCode, statusCode);
});

Then('le message retourné est {string}', function (message) {
  assert.strictEqual(response.body.message, message);
});

Then('le message d\'erreur est {string}', function (errorMessage) {
  assert.strictEqual(response.body.error, errorMessage);
});