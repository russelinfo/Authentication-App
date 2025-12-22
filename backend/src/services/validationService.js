// validationService.js

// Regex centralisées dans un objet pour faciliter la maintenance
const REGEX = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,                       // email simple
  password: /^(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{6,}$/          // mot de passe : min 6 chars, minuscule, chiffre, symbole
};

/**
 * Vérifie si un email est valide
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) =>
  typeof email === 'string' && REGEX.email.test(email);

/**
 * Vérifie si un mot de passe est valide
 * @param {string} password
 * @returns {boolean}
 */
export const isValidPassword = (password) =>
  typeof password === 'string' && REGEX.password.test(password);
