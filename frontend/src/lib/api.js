import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,               // ← here’s the magic
});

export const register      = (data) => API.post("/auth/register", data);
export const login         = (data) => API.post("/auth/login", data);
export const fetchMetadata = (url)  => API.post("/videos/fetch",  { url });
export const summarize     = (url)  => API.post("/videos/summarize", { url });
export const fetchHistory  = ()     => API.get("/videos")
