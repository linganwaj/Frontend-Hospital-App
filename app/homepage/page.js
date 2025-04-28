"use client";
import { Calendar, Users, Newspaper, Phone } from "lucide-react";
import { Button } from "../components/ui/button"
import Link from "next/link";
import Navigation from "../components/navigation"; // Import Navigation
<Navigation className="relative z-10" />

const page = () => {
  const features = [
    {
      icon: Calendar,
      title: "Easy Appointments",
      description: "Book appointments with our specialists in just a few clicks",
    },
    {
      icon: Users,
      title: "Expert Doctors",
      description: "Access to our network of experienced healthcare professionals",
    },
    {
      icon: Newspaper,
      title: "Latest Updates",
      description: "Stay informed with hospital news and health tips",
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description: "Round-the-clock assistance for your healthcare needs",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
       {/* Hero Section */}
       <div className="bg-green-600 bg-opacity-50 py-20 pt-32">
       {/* Add bg-opacity for transparency */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Your Health, Our Priority
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Experience world-class healthcare services with our team of dedicated professionals.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Link href="/book-appointment">
            <Button className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transform px-8 py-4 text-lg rounded-md shadow-md transition">
            Book Appointment
            </Button>


            </Link>
          </div>
        </div>
      </div>
    </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Section Title */}
    <div className="text-center mb-12">
      <h1 className="text-4xl font-extrabold text-gray-900">Why Choose Us?</h1>
      <h2 className="mt-4 text-xl text-gray-600">
        Experience healthcare excellence with our comprehensive services
      </h2>
    </div>

    {/* Features Grid */}
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="relative p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="text-green-500 mb-4">
            <feature.icon size={24} />
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            {feature.title}
          </h3>
          <p className="mt-2 text-base text-gray-500">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</div>

      {/* CTA Section */}
      <div className="bg-[#0077B8]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-white">
              Join thousands of satisfied patients who trust us with their health.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        {/* Find a Doctor Button */}
        <Link href="/departments">
          <Button 
            variant="outline" 
            size="sm" 
            className="border border-white text-white bg-transparent px-4 py-2 text-sm rounded-md hover:bg-[#005F91] hover:border-[#005F91] transition"
          >
                 Find a Doctor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Section (Optional) */}
      <div className="bg-gray-100 py-6">
        <div className="text-center text-gray-700">
          <p>&copy; 2025 Legacy Hospital. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
export default page;


