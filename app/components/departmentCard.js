import Image from 'next/image';
import Link from 'next/link';

export default function DepartmentCard({ department = {}}) {
  // Safely extract department data with fallbacks
  const path = department?.image?.url;
  const imageUrl =`${process.env.NEXT_PUBLIC_STRAPI_URL}${path}`;
  const name =  department?.name;
  const doctorCount = department?.doctors?.length ?? 0;
  const departmentId = department?.id;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        {/* Image Section */}
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden rounded-t-lg">
        <Image
          src={imageUrl}
          alt={`${name} department`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>
      
      {/* Content Section */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {name}
        </h3>
                    
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          {doctorCount} {doctorCount === 1 ? 'Specialist' : 'Specialists'}
        </div>
        
        <div className="mt-auto">
          <Link
            href={`/doctors?department=${departmentId || ''}`}
            className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            View Doctors
          </Link>
        </div>
      </div>
    </div>
  );
}
