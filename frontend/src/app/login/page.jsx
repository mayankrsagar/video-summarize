"use client";
import { useState } from 'react';

import { useAuth } from '../../context/authContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handle = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handle} className="max-w-sm mx-auto mt-20 p-4 bg-white rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="input" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="input" />
      <button type="submit" className="btn-blue mt-2">Login</button>
    </form>
  );
}
