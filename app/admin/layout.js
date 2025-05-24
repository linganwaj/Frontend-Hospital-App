'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '../components/sidebar'; // or wherever your sidebar is

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // Exclude layout on login page
  if (pathname === '/admin/login') {
    return children;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 bg-gray-50">{children}</main>
    </div>
  );
}
