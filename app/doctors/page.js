
import Navigation from "../components/navigation";  
import AnimatedDoctorList from "../components/AnimatedDoctorList";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// ✨ Fetch doctors
async function getDoctorsByDepartment(departmentName) {
  if (!departmentName) return [];

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/doctors?filters[department][name][$eq]=${encodeURIComponent(departmentName)}&populate=department`;
    
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

// ✨ Main Page Component
export default async function DoctorsPage({ searchParams = {} }) {
  const department = searchParams?.department || '';
  const doctors = await getDoctorsByDepartment(department);

  return (
    <>
      {/* Navigation Bar */}
      <Navigation />

      {/* Soft Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-white opacity-60 -z-10" />

      {/* 🔙 Back to Departments */}
      <div className="max-w-7xl mx-auto px-4 mt-24">
        <Link
          href="/departments"
          className="inline-flex items-center text-emerald-700 hover:text-emerald-800 font-medium text-md mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Departments
        </Link>
      </div>

      {/* Animated Doctors List */}
      <AnimatedDoctorList doctors={doctors} department={department} />
    </>
  );
}
