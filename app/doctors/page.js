import Link from "next/link";
import DoctorCard from '../components/doctorCard';
import Navigation from '../components/navigation';  // Import your navigation component

async function getDoctorsByDepartment(departmentName) {
  if (!departmentName) return [];

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/doctors?filters[department][$eq]=${encodeURIComponent(departmentName)}&populate=department`;
    
    const res = await fetch(apiUrl, {
      headers: { 
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}` 
      },
      cache: 'no-store',
    });
    
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Fetch Error:', error);
    return [];
  }
}

export default async function DoctorsPage({ searchParams }) {
  const department = searchParams?.department || '';
  const doctors = await getDoctorsByDepartment(department);

  console.log("Doctors data:", doctors);

  return (
    <div className="container mx-auto px-4 py-8">
      <Navigation />  {/* Render your navigation here */}
      <main>
      <h1 className="text-3xl font-bold mb-4">
         {doctors[0]?.attributes?.department?.data?.attributes?.name 
         ? `Doctors in ${doctors[0].attributes.department.data.attributes.name}`
         : department 
         ? `Doctors in ${department}`
         : 'All Doctors'}
      </h1>
                {doctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map(doctor => (
            <DoctorCard 
              key={doctor?.id}
              id={doctor?.id}
              name={doctor?.attributes?.name || doctor?.name}
              department={doctor?.attributes?.department?.data?.attributes?.name || department}
              availability={doctor?.attributes?.availability || doctor?.availability}
            />
          ))}
          </div>
        ) : (
          <p className="text-lg text-gray-600">
            {department ? `No doctors found in ${department}.` : "Please select a department."}
          </p>
        )}
       <div className="text-center mt-12 mb-8">
        <Link href="/departments">
          <button className="w-3/4 md:w-1/2 bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-2xl font-medium transition duration-300 shadow-lg text-xl">
            Back to Departments
          </button>
        </Link>
        </div>
      </main>
    </div>
  );
}
