// components/Sidebar.js
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, User, Newspaper, LogOut } from 'lucide-react';

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn'); // or any token/session key
    router.push('/admin/login');
  };

  return (
    <div className="w-64 bg-white border-r shadow-sm p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Hospital Admin</h1>
      <nav className="space-y-4">
        <Link href="/admin/appointments" className="flex items-center gap-2 hover:text-blue-600">
          <Calendar size={20} /> Appointments
        </Link>
        <Link href="/admin/doctors" className="flex items-center gap-2 hover:text-blue-600">
          <User size={20} /> Doctors
        </Link>
        <Link href="/admin/articles" className="flex items-center gap-2 hover:text-blue-600">
          <Newspaper size={20} /> News & Events
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-left hover:text-blue-600 w-full"
        >
          <LogOut size={20} /> Logout
        </button>
      </nav>
    </div>
  );
}
