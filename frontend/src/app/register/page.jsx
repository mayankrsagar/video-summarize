'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { register } from '../../lib/api';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();
  const submit = async e => {
    e.preventDefault();
    await register(form);
    router.push('/');
  };
  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl mb-4">Register</h2>
      <input placeholder="Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border p-2 w-full mb-2" />
      <input placeholder="Email" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="border p-2 w-full mb-2" />
      <input placeholder="Password" type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="border p-2 w-full mb-4" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Register</button>
    </form>
  );
}