import jwt from 'jsonwebtoken';

export function generateAuthToken(payload, expiresIn = process.env.JWT_EXPIRE || '2h') {
  if (!process.env.JWT_SECRET) throw new Error('Missing JWT_SECRET');
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

export function verifyAuthToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}