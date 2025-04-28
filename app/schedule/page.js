"use client";
import { Calendar, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import Link from "next/link";
import Navigation from "../components/navigation";

const DoctorsSchedule = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-green-500 bg-opacity-50 py-20 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Doctor's Schedule
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              View the schedules of our dedicated healthcare professionals.
            </p>
          </div>
        </div>
      </div>

      {/* Schedule Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Internal Medicine */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Internal Medicine</h2>
              <ul className="space-y-2">
                <li><strong>Dr. Anthony Bazatsinda:</strong> Wed: 8:00 AM - 9:00 PM, Sun: 8:00 AM - 9:00 PM</li>
                <li><strong>Dr. Oswald Habyarimana:</strong> Thu: 8:00 AM - 9:00 PM, Sun: 8:00 AM - 5:00 PM</li>
                <li><strong>Dr. Sebatunzi Osee:</strong> Thu: 9:00 AM - 9:00 PM, Sat: 8:00 AM - 5:00 PM</li>
                <li><strong>Dr. Maguy Mbabazi:</strong> Wed: 8:00 AM - 9:00 PM, Sun: 8:00 AM - 5:00 PM</li>
                <li><strong>Dr. David Turatsinze:</strong> Thu: 8:00 AM - 9:00 PM, Fri: 8:00 AM - 5:00 PM, Sat</li>
                <li><strong>Dr. Rutaganda Eric:</strong> Thursday and Sunday</li>
              </ul>
            </div>

            {/* Gynecology */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Gynecology</h2>
              <ul className="space-y-2">
                <li><strong>Dr. Gakindi Leonard:</strong> Tue - Fri: 9:00 AM - 5:00 PM</li>
                <li><strong>Dr. Uwineza Mireille:</strong> Thu, Sun: 9:00 AM - 5:00 PM</li>
                <li><strong>Dr. Nkubito Valens:</strong> Sat: 8:00 AM - 5:00 PM</li>
                <li><strong>Dr. Mohamed:</strong> On Visiting Schedule</li>
                <li><strong>Dr. Ntirushwa David:</strong> Fri: 9:00 AM - 5:00 PM, Sat</li>
              </ul>
            </div>

            {/* Pediatrics */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Pediatrics</h2>
              <ul className="space-y-2">
                <li><strong>Dr. Kabayiza Jean Claude:</strong> Mon & Fri: 8:00 AM - 5:00 PM, Sat & Sun: 8:00 AM - 9:00 PM</li>
                <li><strong>Dr. Umuhoza Christian:</strong> Wed & Fri: 8:00 AM - 5:00 PM</li>
                <li><strong>Dr. Aimable Kanyamuhunga:</strong> Tue: 8:00 AM - 9:00 PM, Thu: 5:00 PM - 9:00 PM</li>
                <li><strong>Dr. Mukaruziga Agnes:</strong> Thu: 8:00 AM - 5:00 PM</li>
              </ul>
            </div>

            {/* Chiropractic */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Chiropractic</h2>
              <ul className="space-y-2">
                <li><strong>Dr. Noella Kanyabutembo:</strong> Thu & Fri: 9:00 AM - 5:00 PM</li>
              </ul>
            </div>

            {/* ENT */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">ENT</h2>
              <ul className="space-y-2">
                <li><strong>Dr. Tuyishimire Gratien:</strong> Mon, Wed, Fri: 9:00 AM - 5:00 PM</li>
                <li><strong>Dr. Charles Nkurunziza:</strong> Tue: 8:00 AM - 5:00 PM, Sat: 9:00 AM - 2:00 PM</li>
                <li><strong>Dr. Ncogoza Isaie:</strong> Tue: 5:00 PM - 9:00 PM, Thu: 8:00 AM - 5:00 PM, Sun: 11:00 AM - 4:00 AM</li>
              </ul>
            </div>

            {/* Clinical Psychology */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Clinical Psychology</h2>
              <ul className="space-y-2">
                <li><strong>Mr. Innocent Nsengiyumva:</strong> Mon, Wed, Thu, Fri: 5:00 PM - 9:00 PM</li>
              </ul>
            </div>

            {/* Orthopedics */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Orthopedics</h2>
              <ul className="space-y-2">
                <li><strong>Dr. Bukara Emmanuel:</strong> Mon: 5:00 PM - 9:00 PM, Wed: 9:00 AM - 4:00 PM</li>
                <li><strong>Dr. Kwesiga Stephen:</strong> Tue: 9:00 AM - 3:00 PM, Thu: 9:00 AM - 4:00 PM, Sat: 9:00 AM - 4:00 PM</li>
                <li><strong>Dr. Kanyayisa Marie Grace:</strong> Tue: 11:00 AM - 7:00 PM, Sun: 9:00 AM - 2:00 PM</li>
                <li><strong>Dr. Ingabire Allen:</strong> Mon: 9:00 AM - 2:00 PM, Fri: 1:00 PM - 6:00 PM</li>
              </ul>
            </div>

            {/* Urology */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Urology</h2>
              <ul className="space-y-2">
                <li><strong>Dr. Africa Gasana:</strong> Wed: 5:00 PM - 9:00 PM, Sat: 8:00 AM - 5:00 PM</li>
                <li><strong>Dr. Nyirimodoka Alexandre:</strong> Tue: 2:00 PM - 7:00 PM, Sun: 9:00 AM - 3:00 PM</li>
              </ul>
            </div>

            {/* Cardiology */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Cardiology</h2>
              <ul className="space-y-2">
                <li><strong>Dr. Gapira Ganza JMV:</strong> Mon-Sat: 8:00 AM - 4:00 PM</li>
                <li><strong>Dr. Dufatanye Darius:</strong> Wed: 9:00 AM - 5:00 PM, Thu: 8:00 AM - 5:00 PM, Sun: 9:00 AM - 2:00 PM</li>
              </ul>
            </div>

            {/* General Practitioners */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">General Practitioners</h2>
              <ul className="space-y-2">
                <li><strong>Dr. Yves Laurent:</strong> (According to Weekly Roster) Mon-Sun: 8:00 AM - 9:00 PM</li>
                <li><strong>Dr. Fabrice Ntare Ngabo:</strong> (According to Weekly Roster) Mon-Sun: 8:00 AM - 9:00 PM</li>
                <li><strong>Dr. Kwesiga Ivan:</strong> (According to Weekly Roster) Mon-Sun: 8:00 AM - 9:00 PM</li>
                <li><strong>Dr. Havugimana JMV:</strong> (According to Weekly Roster) Mon-Sun: 8:00 AM - 9:00 PM</li>
              </ul>
            </div>

            {/* Dermatology */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Dermatology</h2>
              <ul className="space-y-2">
                <li><strong>Dr. Kanimba Emmanuel:</strong> Mon: 5:00 PM - 9:00 PM, Wed: 4:00 PM - 9:00 PM, Thu: 8:00 AM - 3:00 PM, Fri: 4:00 PM - 7:00 PM, Sat: 8:00 AM - 3:00 PM</li>
              </ul>
            </div>

            {/* Dental */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Dental</h2>
              <ul className="space-y-2">
                <li><strong>Dr. Roger Anamali:</strong> According to the monthly roster</li>
                <li><strong>Dr. Nyiraneza Esperance:</strong> According to the monthly roster</li>
                <li><strong>Mr. Ishimwe Gilbert:</strong> According to the monthly roster</li>
                <li><strong>Dr. Eric Rutaganda:</strong> According to the monthly roster</li>
                <li><strong>Dr. Gilbert Ndayisenga:</strong> According to the monthly roster</li>
                <li><strong>Dr. Bugesera Ernest:</strong> According to the monthly roster</li>
                <li><strong>Dr. Sandeep Goyal:</strong> According to the monthly roster</li>
                <li><strong>Dr. Dheetaj Rohilla:</strong> According to the monthly roster</li>
                <li><strong>Dr. Bede Bana:</strong> According to the monthly roster</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#0077B8]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-white sm:text-4xl">
              Need to Book an Appointment?
            </h2>
            <p className="mt-4 text-lg text-white">
              Schedule your visit with our specialists today.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/booking">
                <Button
                  variant="outline"
                  size="sm"
                  className="border border-white text-white bg-transparent px-4 py-2 text-sm rounded-md hover:bg-[#005F91] hover:border-[#005F91] transition"
                >
                  Book Appointment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-100 py-6">
        <div className="text-center text-gray-700">
          <p>&copy; 2025 Legacy Hospital. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorsSchedule;