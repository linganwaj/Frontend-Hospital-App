"use client";

import Navigation from "../components/navigation";
import DepartmentCard from "../components/departmentCard";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// ✨ Fetch departments
async function getDepartments() {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/departments?populate=*`;
    console.log("Fetching from:", apiUrl);

    const res = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);

    const response = await res.json();
    return response.data;
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

// ✨ Page Component
export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDepartments() {
      const data = await getDepartments();
      setDepartments(data);
      setLoading(false);
    }
    fetchDepartments();
  }, []);

  return (
    <>
      <Navigation />

      {/* Soft background visual */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-white opacity-60 -z-10" />

      <main className="container mx-auto px-4 py-8 mt-12">
      <h1 className="text-4xl font-bold text-emerald-700 mb-8">Our Healthcare Departments</h1>


        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-40 bg-gray-200 rounded-lg" />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {departments.length > 0 ? (
              departments.map((dept) => (
                <motion.div
                  key={dept.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <DepartmentCard department={dept} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500">
                No departments found.
              </div>
            )}
          </motion.div>
        )}
      </main>
    </>
  );
}
