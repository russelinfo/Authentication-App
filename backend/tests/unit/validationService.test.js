import { isValidEmail, isValidPassword } from '../../src/services/validationService.js';

test('email valide doit contenir @', () => {
  expect(isValidEmail('test@email.com')).toBe(true);
});

test('email invalide sans @', () => {
  expect(isValidEmail('testemail.com')).toBe(false);
});

test('mot de passe valide >=6 caractères', () => {
  expect(isValidPassword('secret1')).toBe(true);
});

test('mot de passe invalide <6 caractères', () => {
  expect(isValidPassword('123')).toBe(false);
});
