'use client';

import { Calendar, Users, Newspaper, Phone } from "lucide-react";
import { Button } from "../components/ui/button";
import Link from "next/link";
import Navigation from "../components/navigation";
import ArticlesSlider from "../components/ArticlesSlider";

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
      <div className="bg-green-600 py-20 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Your Health, Our Priority
          </h1>
          <p className="mt-4 text-gray-700 text-lg max-w-2xl mx-auto">
            Experience world-class healthcare services with our team of dedicated professionals.
          </p>
          <div className="mt-8">
            <Link href="/book-appointment">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transform px-8 py-4 text-lg rounded-md shadow-md transition">
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900">Why Choose Us?</h2>
            <p className="mt-4 text-xl text-gray-600">
              Experience healthcare excellence with our comprehensive services
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md text-center transition-shadow"
              >
                <div className="text-green-500 mb-4 mx-auto">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-base text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Slider Section */}
      <div className="bg-green-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white">Latest Articles</h2>
            <p className="text-base text-green-100 mt-1">
              Stay informed with the latest updates, schedules, and events at Legacy Clinics.
            </p>
          </div>

          <div className="[&_.swiper-pagination]:mt-4 [&_.swiper-pagination]:relative">
            <ArticlesSlider />
          </div>

          <div className="text-center mt-6">
            <Link href="/articles">
              <Button className="bg-white text-green-700 hover:bg-green-100 px-6 py-2 rounded-md font-medium transition">
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#0077B8] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-white">Ready to get started?</h2>
          <p className="mt-4 text-lg text-white">
            Join thousands of satisfied patients who trust us with their health.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
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

      {/* Footer */}
      <div className="bg-gray-100 py-6">
        <div className="text-center text-gray-700">
          <p>&copy; 2025 Legacy Hospital. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default page;
