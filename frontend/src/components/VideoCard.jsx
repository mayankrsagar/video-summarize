export default function VideoCard({ video }) {
  return (
    <div className="border p-4 mb-4">
      <h2 className="text-lg font-semibold">{video.title}</h2>
      <p className="text-sm text-gray-500">{new Date(video.createdAt).toLocaleString()}</p>
      <pre className="bg-gray-100 p-2 mt-2 whitespace-pre-wrap">{video.summary}</pre>
    </div>
  );
}