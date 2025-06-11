"use client";
import useSWR from 'swr';

import { fetchHistory } from '@/lib/api';

export default function HistoryPage() {
  const { data, error } = useSWR("history", fetchHistory);

  if (error) return <p>Error loading history</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Your Summaries</h1>
      {data.data.videos.length === 0 && <p>No history yet.</p>}
      {data.data.videos.map((v) => (
        <div key={v._id} className="mb-4 p-4 bg-white rounded shadow">
          <h2 className="font-semibold">{v.title}</h2>
          <p className="text-sm text-gray-500">{new Date(v.createdAt).toLocaleString()}</p>
          <pre className="mt-2 p-2 bg-gray-100 rounded whitespace-pre-wrap">{v.summary}</pre>
        </div>
      ))}
    </div>
  );
}
