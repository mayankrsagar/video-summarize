"use client";
import { useState } from 'react';

import { register } from '../../lib/api';

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handle = async (e) => {
    e.preventDefault();
    await register({ name: "", email, password });
    // After register, you may redirect to login
  };

  return (
    <form onSubmit={handle} className="max-w-sm mx-auto mt-20 p-4 bg-white rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Register</h1>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="input" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="input" />
      <button type="submit" className="btn-blue mt-2">Register</button>
    </form>
  );
}
