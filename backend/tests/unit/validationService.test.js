import { isValidEmail, isValidPassword } from '../../src/services/validationService.js';

describe('Validation email', () => {
  test('email valide avec format correct', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name@domain.co')).toBe(true);
  });

  test('email invalide sans @', () => {
    expect(isValidEmail('testexample.com')).toBe(false);
  });

  test('email invalide sans domaine', () => {
    expect(isValidEmail('test@')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
  });

  test('email invalide avec espace', () => {
    expect(isValidEmail('user @example.com')).toBe(false);
  });
});

describe('Validation mot de passe', () => {
  test('mot de passe valide (min 6, chiffre, minuscule, symbole)', () => {
    expect(isValidPassword('Abcdef1!')).toBe(true);
  });

  test('mot de passe invalide <6 caractères', () => {
    expect(isValidPassword('A1!a')).toBe(false);
  });

  test('mot de passe invalide sans chiffre', () => {
    expect(isValidPassword('Abcdef!')).toBe(false);
  });

  test('mot de passe invalide sans minuscule', () => {
    expect(isValidPassword('ABCDEF1!')).toBe(false);
  });

  test('mot de passe invalide sans symbole', () => {
    expect(isValidPassword('Abcdef12')).toBe(false);
  });
});
