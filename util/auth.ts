import bcrypt from 'bcrypt';

export function generateCsrfSecretByToken(token: string) {
  return token + process.env.CSRF_SECRET_SALT;
}

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}
