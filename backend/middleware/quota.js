import User from '../models/User.js';

export async function quotaCheck(req, res, next) {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(401).json({ message: 'Unauthorized' });
  if (user.role === 'user') {
    const now = Date.now();
    const resetWindow = 24 * 60 * 60 * 1000;
    if (!user.profile.lastSummaryReset || now - user.profile.lastSummaryReset.getTime() > resetWindow) {
      user.profile.lastSummaryReset = new Date(now);
      user.profile.dailyCount = 0;
    }
    if (user.profile.dailyCount >= 3) {
      return res.status(429).json({ message: 'Daily quota exceeded' });
    }
    user.profile.dailyCount += 1;
    await user.save();
  }
  next();
}