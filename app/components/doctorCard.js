"use client";
import Link from 'next/link';
import { CalendarIcon, StethoscopeIcon } from 'lucide-react';  // optional icons if you want

export default function DoctorCard({ 
  id,
  name,
  department,
  availability
}) {
  // Format availability
  const formatAvailability = (hours) => {
    if (!hours) return "Schedule not available";

    try {
      const availabilityObj = typeof hours === 'string' ? JSON.parse(hours) : hours;

      if (Object.keys(availabilityObj).length === 0) {
        return "No schedule provided.";
      }

      const daysOfWeekOrder = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];

      const sortedDays = Object.keys(availabilityObj).sort((a, b) => {
        return daysOfWeekOrder.indexOf(a) - daysOfWeekOrder.indexOf(b);
      });

      return sortedDays.map((day) => {
        const times = availabilityObj[day];
        if (!times || !times.open || !times.close) {
          return (
            <div key={day} className="text-sm text-gray-500">
              <span className="font-semibold">{day}: </span> No times available
            </div>
          );
        }
        return (
          <div key={day} className="text-sm text-gray-700">
            <span className="font-semibold">{day}: </span>
            {times.open} - {times.close}
          </div>
        );
      });
    } catch (error) {
      console.error("Error parsing availability:", error);
      return "Schedule not available";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:scale-[1.02]">
      <div className="p-6 flex-grow">
        
        {/* Doctor Name */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-emerald-700">{name}</h3>
        </div>

        {/* Department */}
        <div className="mb-4 flex items-center gap-2">
          <StethoscopeIcon className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
            {typeof department === 'object' 
              ? department?.data?.attributes?.name || 'General'
              : department || 'General'}
          </span>
        </div>

        {/* Working Hours */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <CalendarIcon className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-semibold text-gray-600">Working Hours:</span>
          </div>
          <div className="text-gray-700 space-y-1 mt-2">
            {formatAvailability(availability)}
          </div>
        </div>
      </div>

      {/* Book Appointment Button */}
      <div className="p-4 border-t border-gray-100">
        <Link href={`/book-appointment?doctorId=${id}&department=${encodeURIComponent(department)}`}>
          <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-xl font-semibold text-md transition-all duration-300">
            Book Appointment
          </button>
        </Link>
      </div>
    </div>
  );
}
