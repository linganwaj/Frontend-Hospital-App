"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white">
      
      {/* Subtle Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[60vw] h-[60vw] bg-blue-100 opacity-30 rounded-full animate-ping-slow top-[-10%] left-[-10%]" />
        <div className="absolute w-[80vw] h-[80vw] bg-green-100 opacity-20 rounded-full animate-ping-slower bottom-[-20%] right-[-20%]" />
      </div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="z-10 flex flex-col items-center text-center px-4"
      >
        
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2, duration: 1 }}
          className="mb-6"
        >
          <Image
            src="/Big Size.png"
            alt="Hospital Logo"
            width={200}
            height={200}
            className="logo"
          />
        </motion.div>

        {/* Welcome Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4, duration: 1 }}
          className="welcome-heading text-4xl md:text-5xl font-bold text-green-700 mb-4"
        >
          Welcome to Legacy Clinics
        </motion.h1>

        {/* Welcome Message */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.6, duration: 1 }}
          className="welcome-message text-gray-600 max-w-2xl mx-auto mb-6"
        >
          Your health is our priority. We are committed to providing the best care
          for you and your loved ones. Book an appointment today and experience
          world-class healthcare services.
        </motion.p>

        {/* Book Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.8, duration: 1 }}
        >
          <Link href="/homepage">
            <button className="explore-button transform hover:scale-105 hover:shadow-lg transition duration-300 bg-blue-600 text-white px-8 py-4 rounded-md shadow-md">
              Explore and Book an Appointment
            </button>
          </Link>
        </motion.div>

      </motion.div>

      {/* Fast Facts Section */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1.2, duration: 1 }}
        className="z-10 mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-6xl w-full text-center"
      >
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-2xl font-bold text-green-600">5,000+</h3>
          <p className="mt-2 text-gray-600">Patients Served</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-2xl font-bold text-green-600">10+</h3>
          <p className="mt-2 text-gray-600">Expert Doctors</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-2xl font-bold text-green-600">10 Years</h3>
          <p className="mt-2 text-gray-600">of Healthcare Excellence</p>
        </div>
      </motion.div>
    </div>
  );
}
