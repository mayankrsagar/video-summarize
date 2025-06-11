import express from 'express';

import { requireAuth } from '../middleware/auth.js';
import { quotaCheck } from '../middleware/quota.js';
import Video from '../models/Video.js';
import { summarizeTranscript } from '../utils/openaiUtils.js';
import {
  fetchVideoMetadata,
  getVideoTranscript,
} from '../utils/youtubeUtils.js';

const router = express.Router();

router.post('/fetch', requireAuth, async (req, res) => {
  try {
    const meta = await fetchVideoMetadata(req.body.youtubeUrl);
    res.json(meta);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/summarize', requireAuth, quotaCheck, async (req, res) => {
  try {
    const meta = await fetchVideoMetadata(req.body.youtubeUrl);
    const transcript = await getVideoTranscript(meta.videoId);
    const summary = await summarizeTranscript(transcript);
    const video = new Video({
      youtubeVideoId: meta.videoId,
      title: meta.title,
      description: meta.description,
      uploaderId: req.user.id,
      tags: meta.tags,
      summary
    });
    await video.save();
    res.json({ video });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const videos = await Video.find({ uploaderId: userId }).sort({ createdAt: -1 });
  res.json({ videos });
});

export default router;