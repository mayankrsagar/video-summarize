import { google } from 'googleapis';
import ytTranscript from 'youtube-transcript';

const youtube = google.youtube('v3');

export function extractVideoId(url) {
  const match = url.match(/[?&]v=([^&]+)/);
  if (!match) throw new Error('Invalid YouTube URL');
  return match[1];
}

export async function fetchVideoMetadata(youtubeUrl) {
  const videoId = extractVideoId(youtubeUrl);
  const res = await youtube.videos.list({
    key: process.env.YOUTUBE_API_KEY,
    part: ['snippet', 'contentDetails'],
    id: [videoId]
  });
  const item = res.data.items[0];
  if (!item) throw new Error('Video not found');
  return {
    videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    tags: item.snippet.tags || [],
    duration: item.contentDetails.duration,
    thumbnail: item.snippet.thumbnails.default.url
  };
}

export async function getVideoTranscript(videoId) {
  const transcript = await ytTranscript.fetchTranscript(videoId);
  return transcript.map(t => t.text).join(' ');
}