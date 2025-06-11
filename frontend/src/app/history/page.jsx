'use client';
import useSWR from 'swr';

import VideoCard from '../../components/VideoCard';
import { useAuth } from '../../context/AuthContext';
import { getHistory } from '../../lib/api';

export default function HistoryPage() {
  const { user } = useAuth();
  const { data, error, isLoading } = useSWR(user ? 'history' : null, getHistory);

  if (!user) return <div>Loading...</div>;
  if (error) return <div>Error loading history: {error.message}</div>;
  if (isLoading) return <div>Loading history...</div>;
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl mb-4">History</h1>
      {data.videos.length === 0 ? (
        <p>No history found</p>
      ) : (
        data.videos.map(v => <VideoCard key={v._id} video={v} />)
      )}
    </div>
  );
}