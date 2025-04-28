// components/DoctorCard.js
import Link from 'next/link';

export default function DoctorCard({ 
  id,
  name,
  department,
  availability
}) {
  // Format availability for display
  const formatAvailability = (hours) => {
    if (!hours) return "Schedule not available";
    
    try {
      // Parse the JSON string if it's a string
      const availabilityObj = typeof hours === 'string' ? JSON.parse(hours) : hours;
      
      return Object.entries(availabilityObj).map(([day, times]) => (
        <div key={day} className="mb-1">
          <span className="font-medium">{day}: </span>
          {times.opening_time} - {times.closing_time}
        </div>
      ));
    } catch (error) {
      console.error("Error parsing availability:", error);
      return "Schedule not available";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="p-6 flex-grow">
        {/* Doctor Name */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        </div>

        {/* Department */}
        <div className="mb-4">
          <span className="text-sm font-semibold text-gray-500">Department:</span>
          <p className="text-gray-700">
            {typeof department === 'object' 
              ? department?.data?.attributes?.name || 'General'
              : department || 'General'}
          </p>
        </div>

        {/* Working Hours */}
        <div className="mb-4">
          <span className="text-sm font-semibold text-gray-500">Working Hours:</span>
          <div className="text-gray-700 mt-1">
            {formatAvailability(availability)}
          </div>
        </div>
      </div>

      {/* Book Appointment Button - Now fixed at bottom */}
      <div className="p-4 border-t border-gray-100">
        <Link href={`/book-appointment?doctorId=${id}`}>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition duration-300">
            Book Appointment
          </button>
        </Link>
      </div>
       </div>
  );
}