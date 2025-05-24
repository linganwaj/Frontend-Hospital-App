"use client";

import { motion } from "framer-motion";
import DoctorCard from "./doctorCard";
import Link from "next/link";

export default function AnimatedDoctorList({ doctors, department }) {
  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <main className="text-center">
        {/* Animated Title */}
        <motion.h1 
          className="text-4xl font-bold text-emerald-700 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {doctors[0]?.attributes?.department?.data?.attributes?.name 
            ? `Doctors in ${doctors[0].attributes.department.data.attributes.name}`
            : department 
            ? `Doctors in ${department}`
            : 'All Doctors'}
        </motion.h1>

        {/* Doctors Grid */}
        {doctors.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 }
              }
            }}
          >
            {doctors.map((doctor) => (
              <motion.div
                key={doctor?.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <DoctorCard 
                  id={doctor?.id}
                  name={doctor?.attributes?.name || doctor?.name}
                  department={doctor?.attributes?.department?.data?.attributes?.name || department}
                  availability={doctor?.attributes?.availability || doctor?.availability}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {department ? `No doctors found in ${department}.` : "Please select a department."}
          </motion.p>
        )}

        {/* Back Button */}
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
