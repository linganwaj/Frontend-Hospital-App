"use client";

import { motion } from "framer-motion";
import DoctorCard from "./doctorCard";
import Link from "next/link";

export default function AnimatedDoctorList({ doctors, department }) {
  const title =
    doctors[0]?.attributes?.department?.data?.attributes?.name ||
    department ||
    "All Doctors";

  return (
    <div className="w-full px-4 py-12 flex flex-col items-center">
      <main className="w-full max-w-7xl text-center">
        {/* Animated Title */}
        <motion.h1
          className="text-3xl sm:text-4xl font-bold text-emerald-700 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Doctors in {title}
        </motion.h1>

        {/* Doctors Grid */}
        {doctors.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {doctors.map((doctor) => (
              <motion.div
                key={doctor?.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
              >
                <DoctorCard
                  id={doctor.id}
                  name={doctor.attributes?.name || doctor.name}
                  department={
                    doctor.attributes?.department?.data?.attributes?.name ||
                    department
                  }
                  availability={
                    doctor.attributes?.availability || doctor.availability
                  }
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p
            className="text-lg text-gray-600 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {department
              ? `No doctors found in ${department}.`
              : "Please select a department."}
          </motion.p>
        )}

        {/* Back Button */}
        <div className="text-center mt-16">
          <Link href="/departments">
            <button className="w-64 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium text-lg transition duration-300 shadow-md">
              Back to Departments
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
