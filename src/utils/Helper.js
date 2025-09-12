// src/utils/Helper.js

/**
 * Utility functions for validation
 */

export const isValidEmail = (email) => {
  if (!email || typeof email !== "string") return false;
  const e = email.trim();
  // Basic but slightly stricter email regex (local@domain.tld with at least 2 char tld)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(e);
};

export const isStrongPassword = (password) => {
  if (!password || typeof password !== "string") return false;
  // Do NOT trim password (users may intentionally include spaces)
  // At least 8 characters, one uppercase, one lowercase, one number, one special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const isValidPhone = (phone) => {
  if (!phone || typeof phone !== "string") return false;
  const digits = phone.replace(/\D/g, ""); // drop non-digits
  // require between 10 and 15 digits (covers local + country code)
  return digits.length >= 10 && digits.length <= 15;
};

export const isValidName = (name) => {
  if (!name || typeof name !== "string") return false;
  const n = name.trim();
  // At least 3 letters, only alphabets & spaces allowed
  const nameRegex = /^[A-Za-z\s]{3,}$/;
  return nameRegex.test(n);
};
