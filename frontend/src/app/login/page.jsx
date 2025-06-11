'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useAuth } from '../../context/AuthContext';
import { login } from '../../lib/api';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const submit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await login(form);
      authLogin(res.data.user);
      router.push('/');
    } catch (err) {
      setError('Login failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl mb-4">Login</h2>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <input 
        placeholder="Email" 
        type="email" 
        required 
        value={form.email} 
        onChange={e => setForm({ ...form, email: e.target.value })} 
        className="border p-2 w-full mb-2" 
      />
      <input 
        placeholder="Password" 
        type="password" 
        required 
        value={form.password} 
        onChange={e => setForm({ ...form, password: e.target.value })} 
        className="border p-2 w-full mb-4" 
      />
      <button 
        type="submit" 
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 disabled:opacity-50"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}