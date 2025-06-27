"use client";

import Link from "next/link";
import { CalendarIcon, StethoscopeIcon } from "lucide-react";

export default function DoctorCard({ id, name, department, availability }) {
  const formatAvailability = (hours) => {
    if (!hours) return "Schedule not available";

    try {
      const availabilityObj = typeof hours === "string" ? JSON.parse(hours) : hours;

      if (Object.keys(availabilityObj).length === 0) {
        return "No schedule provided.";
      }

      const daysOfWeekOrder = [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ];

      const sortedDays = Object.keys(availabilityObj).sort(
        (a, b) => daysOfWeekOrder.indexOf(a) - daysOfWeekOrder.indexOf(b)
      );

      return sortedDays.map((day) => {
        const times = availabilityObj[day];
        return (
          <div key={day} className="text-sm text-gray-600 flex justify-between">
            <span className="font-medium">{day}:</span>
            <span>{times?.open && times?.close ? `${times.open} - ${times.close}` : "No hours"}</span>
          </div>
        );
      });
    } catch (error) {
      console.error("Error parsing availability:", error);
      return "Schedule not available";
    }
  };

  const departmentName = typeof department === "object"
    ? department?.data?.attributes?.name || "General"
    : department || "General";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition p-6 w-full max-w-sm mx-auto flex flex-col gap-4">
      
      {/* Doctor Name */}
      <h3 className="text-xl font-semibold text-emerald-700">{name}</h3>

      {/* Department */}
      <div className="flex items-center gap-2 text-sm">
        <StethoscopeIcon className="w-4 h-4 text-green-500" />
        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
          {departmentName}
        </span>
      </div>

      {/* Working Hours */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
          <CalendarIcon className="w-4 h-4 text-blue-500" />
          Working Hours
        </div>
        <div className="text-sm space-y-1">
          {formatAvailability(availability)}
        </div>
      </div>

      {/* Button */}
      <Link href={`/book-appointment?doctorId=${id}&department=${encodeURIComponent(departmentName)}`}>
        <button className="mt-4 w-full bg-blue-700 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium text-sm transition">
          Book Appointment
        </button>
      </Link>
    </div>
  );
}
