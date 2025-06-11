'use client';
import { useState } from 'react';

import { useAuth } from '../context/AuthContext';
import {
  fetchMetadata,
  summarize,
} from '../lib/api';

export default function HomePage() {
  const { user } = useAuth();
  const [url, setUrl] = useState('');
  const [meta, setMeta] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    try {
      setError('');
      const res = await fetchMetadata(url);
      setMeta(res.data);
    } catch (err) {
      setError('Failed to fetch metadata: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleSummarize = async () => {
    try {
      setError('');
      setLoading(true);
      const res = await summarize(url);
      setSummary(res.data.video.summary);
    } catch (err) {
      setError('Failed to summarize: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl mb-4">Video Insight Summarizer</h1>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <input
        type="text"
        placeholder="YouTube URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button 
        onClick={handleFetch} 
        className="bg-green-500 text-white px-4 py-2 mr-2 disabled:opacity-50"
        disabled={!url}
      >
        Fetch Metadata
      </button>
      
      {meta && (
        <div className="mt-4">
          <h2 className="text-xl">{meta.title}</h2>
          <img src={meta.thumbnail} alt="thumbnail" className="my-2 max-w-xs" />
          <button 
            onClick={handleSummarize} 
            disabled={loading} 
            className="bg-blue-500 text-white px-4 py-2 disabled:opacity-50"
          >
            {loading ? 'Summarizing...' : 'Summarize'}
          </button>
          {summary && <pre className="bg-gray-100 p-4 mt-4 whitespace-pre-wrap">{summary}</pre>}
        </div>
      )}
    </div>
  );
}