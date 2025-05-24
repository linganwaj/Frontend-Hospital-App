'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [adminCreds, setAdminCreds] = useState({ username: 'admin', password: 'password123' });
  const router = useRouter();

  // ✅ Get admin credentials from env on mount (safe for client-side)
  useEffect(() => {
    const USER = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin';
    const PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'password123';
    setAdminCreds({ username: USER, password: PASS });

    // Redirect if already logged in
    if (localStorage.getItem('adminLoggedIn')) {
      router.replace('/admin/appointments');
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === adminCreds.username && password === adminCreds.password) {
      localStorage.setItem('adminLoggedIn', 'true');
      router.push('/admin/appointments');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-8 text-center">
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <Image
            src="/Big Size.png"
            alt="Logo"
            width={64}
            height={64}
            className="rounded-full"
          />
        </div>

        <h1 className="text-xl font-bold text-gray-700 mb-1">Welcome Legacy Staff</h1>
        <p className="text-sm text-gray-500 mb-6">Please enter your credentials to continue</p>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
      </div>
    </div>
  );
}
