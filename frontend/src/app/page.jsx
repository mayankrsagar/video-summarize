"use client";
import { useState } from 'react';

import { useAuth } from '../context/authContext';
import {
  fetchMetadata,
  summarize,
} from '../lib/api';

export default function HomePage() {
  const { user } = useAuth();
  const [url, setUrl] = useState("");
  const [meta, setMeta] = useState(null);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) return <p className="text-center mt-20 text-xl">Please login first.</p>;

  const handleFetch = async () => {
    try {
      const res = await fetchMetadata(url);
      setMeta(res.data);
      setSummary("");
    } catch (e) {
      setError(e.response?.data.error || e.message);
    }
  };

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const res = await summarize(url);
      setSummary(res.data.video.summary);
    } catch (e) {
      setError(e.response?.data.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4">
        <input
          type="text"
          placeholder="YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <button onClick={handleFetch} disabled={!url} className="btn-blue mt-2">Fetch</button>
      </div>
      {meta && (
        <div className="mt-6">
          <h2 className="font-semibold">{meta.title}</h2>
          <img src={meta.thumbnail} alt="" className="mt-2 rounded" />
          <button onClick={handleSummarize} disabled={loading} className="btn-blue mt-4">
            {loading ? "Summarizing..." : "Summarize"}
          </button>
          {summary && <pre className="bg-white p-4 rounded mt-4 whitespace-pre-wrap">{summary}</pre>}
        </div>
      )}
    </div>
  );
}
