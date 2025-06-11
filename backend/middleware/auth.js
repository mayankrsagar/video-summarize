import { verifyAuthToken } from '../utils/jwtUtils.js';

export function requireAuth(req, res, next) {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = verifyAuthToken(token);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}