"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function DepartmentCard({ department = {} }) {
  // Safely extract department data with fallbacks
  const path = department?.image?.url;
  const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${path}`;
  const name = department?.name || "Unnamed Department";
  const doctorCount = department?.doctors?.length ?? 0;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col h-full">
      
      {/* Image Section */}
      <div className="relative w-full h-48 bg-white overflow-hidden rounded-t-2xl group">
        <Image
          src={imageUrl}
          alt={`${name} department`}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-500 ease-in-out p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>
      
      {/* Content Section */}
      <div className="p-6 flex-grow flex flex-col text-center">
        <h3 className="text-2xl font-bold text-emerald-700 mb-2">
          {name}
        </h3>

        {/* Specialist Count */}
        <div className="flex justify-center items-center text-sm text-gray-600 mb-6">
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-2 font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {doctorCount} {doctorCount === 1 ? 'Specialist' : 'Specialists'}
          </div>
        </div>

        {/* View Doctors Button */}
        <div className="mt-auto">
          <Link
            href={`/doctors?department=${encodeURIComponent(name)}`}
            className="inline-block w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold text-md px-6 py-3 rounded-xl transition duration-300"
          >
            View Doctors
          </Link>
        </div>
      </div>
    </div>
  );
}
