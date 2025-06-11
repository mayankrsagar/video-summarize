'use client';
import Link from 'next/link';

import { useAuth } from '@/context/authContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/history">History</Link>
      </div>
      {user ? (
        <button onClick={logout} className="underline">Logout</button>
      ) : (
        <div className="space-x-4">
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      )}
    </nav>
  );
}