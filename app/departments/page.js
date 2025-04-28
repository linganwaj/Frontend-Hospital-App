import Link from "next/link";
import Navigation from "../components/navigation";
import DepartmentCard from '../components/departmentCard';

async function getDepartments() {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/departments?populate=*`;
    console.log('Fetching from:', apiUrl);
    
    const res = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      cache: 'no-store',
    });
    
    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    
    const response = await res.json();
    return response.data;
    } catch (error) {
    console.error('Fetch Error:', error);
    return [];
  }
}

export default async function DepartmentsPage() {
  const departments = await getDepartments();

  return (
    <>
    <Navigation />
    <main className="container mx-auto px-4 py-8 mt-12"> 
       <h1 className="text-3xl font-bold mb-4">Our Healthcare Departments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <DepartmentCard 
            key={dept.id}
            department={dept}
            />
        ))}
      </div>
      </main>
      </>
  );
}