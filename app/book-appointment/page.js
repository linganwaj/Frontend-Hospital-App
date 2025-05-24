"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../components/ui/button";
import Navigation from "../components/navigation";
import { getDepartments, getDoctorsByDepartment, getDoctorAvailability } from "../../utils/api";

export default function BookAppointment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorId") || "";
  const departmentName = searchParams.get("department") || "";

  const [formData, setFormData] = useState({
    name: "",
    phonenumber: "",
    email: "",
    department: departmentName || "",
    doctor: doctorId || "",
    date: "",
    dob: "",
  });

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [availability, setAvailability] = useState({});
  const [isLoading, setIsLoading] = useState({ departments: false, doctors: false, slots: false, submit: false });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      setIsLoading(prev => ({ ...prev, departments: true }));
      try {
        const departmentsData = await getDepartments();
        setDepartments(departmentsData);

        if (departmentName && departmentsData.length > 0) {
          const selectedDepartment = departmentsData.find(dep =>
            (dep.attributes?.name || dep.name) === departmentName
          );
          if (selectedDepartment) {
            setFormData(prev => ({ ...prev, department: selectedDepartment.id.toString() }));
          }
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      } finally {
        setIsLoading(prev => ({ ...prev, departments: false }));
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (formData.department) {
      const fetchDoctors = async () => {
        setIsLoading(prev => ({ ...prev, doctors: true }));
        try {
          const doctorsData = await getDoctorsByDepartment(formData.department);
          setDoctors(doctorsData);

          if (doctorId && doctorsData.length > 0) {
            const selectedDoctor = doctorsData.find(doc =>
              doc.id.toString() === doctorId
            );
            if (selectedDoctor) {
              setFormData(prev => ({ ...prev, doctor: selectedDoctor.id.toString() }));
            }
          }
        } catch (error) {
          console.error('Error fetching doctors:', error);
        } finally {
          setIsLoading(prev => ({ ...prev, doctors: false }));
        }
      };
      fetchDoctors();
    }
  }, [formData.department]);

  useEffect(() => {
    if (formData.doctor) {
      const fetchAvailability = async () => {
        setIsLoading(prev => ({ ...prev, slots: true }));
        try {
          const data = await getDoctorAvailability(formData.doctor);
          setAvailability(data || {});
        } catch (error) {
          console.error('Error fetching availability:', error);
        } finally {
          setIsLoading(prev => ({ ...prev, slots: false }));
        }
      };
      fetchAvailability();
    }
  }, [formData.doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    if (!date) {
      setFormData(prev => ({ ...prev, date: "" }));
      return;
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    setFormData(prev => ({ ...prev, date: `${year}-${month}-${day}` }));
  };

  const isDateAvailable = (date) => {
    if (!date || Object.keys(availability).length === 0) return false;
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    return availability.hasOwnProperty(dayName);
  };

  const getHighlightedDates = () => {
    const today = new Date();
    const highlightedDates = [];
    for (let i = 0; i < 60; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      if (isDateAvailable(date)) highlightedDates.push(new Date(date));
    }
    return highlightedDates;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(prev => ({ ...prev, submit: true }));

    try {
      const selectedDoctor = doctors.find(doc => doc.id === parseInt(formData.doctor));
      const selectedDepartment = departments.find(dep => dep.id === parseInt(formData.department));

      const payload = {
        data: {
          name: formData.name.trim(),
          dob: formData.dob,
          email: formData.email.trim(),
          phonenumber: formData.phonenumber.trim(),
          date: formData.date,
          doctor: selectedDoctor?.attributes?.name || selectedDoctor?.name || '',
          department: selectedDepartment?.attributes?.name || selectedDepartment?.name || ''
        }
      };

      const response = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (!response.ok || !result?.data?.id) {
        throw new Error(result?.error?.message || 'Booking failed');
      }

      router.push(`/confirmation?id=${result.data.id}`);
    } catch (err) {
      console.error('Booking error:', err);
      setError(err.message || 'Failed to book appointment. Please try again.');
    } finally {
      setIsLoading(prev => ({ ...prev, submit: false }));
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-green-500 py-20 pt-32">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h1 className="text-5xl font-extrabold text-emerald-700 mb-4">Book Your Appointment</h1>
          <p className="text-lg text-gray-700">Fill out the form below to schedule your visit</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="py-12 bg-white">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded animate-pulse">
                {error}
              </div>
            )}

          <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">Full Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  minLength={2}
                  className="mt-2 w-full p-4 border border-gray-300 rounded-lg"
                />
              </div>


              {/* Date of Birth */}
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">Date of Birth*</label>
                <DatePicker
                  selected={formData.dob ? new Date(formData.dob) : null}
                  onChange={(date) => {
                    if (!date) {
                      setFormData(prev => ({ ...prev, dob: "" }));
                      return;
                    }
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    setFormData(prev => ({ ...prev, dob: `${year}-${month}-${day}` }));
                  }}
                  placeholderText="Select your date of birth"
                  className="mt-2 w-full p-4 border border-gray-300 rounded-lg"
                  required
                  dateFormat="yyyy-MM-dd"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  maxDate={new Date()}
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full p-4 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">Phone Number*</label>
                <input
                  type="tel"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10,15}"
                  className="mt-2 w-full p-4 border border-gray-300 rounded-lg"
                />
              </div>

              <hr className="my-6 border-gray-300" />

              {/* Department */}
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full p-4 border border-gray-300 rounded-lg"
                  disabled={isLoading.departments}
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>
                      {dept.attributes?.name || dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctor */}
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">Doctor</label>
                <select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full p-4 border border-gray-300 rounded-lg"
                  disabled={!formData.department || isLoading.doctors}
                >
                  <option value="">Select Doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.attributes?.name || doctor.name}
                    </option>
                  ))}
                </select>
              </div>

              <hr className="my-6 border-gray-300" />

              {/* Date Picker */}
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">Date*</label>
                <DatePicker
                  selected={formData.date ? new Date(formData.date) : null}
                  onChange={handleDateChange}
                  filterDate={isDateAvailable}
                  minDate={new Date()}
                  placeholderText="Select available day"
                  className="mt-2 w-full p-4 border border-gray-300 rounded-lg"
                  required
                  dateFormat="yyyy-MM-dd"
                  highlightDates={[
                    { dates: getHighlightedDates(), className: 'react-datepicker__day--highlighted-custom' }
                  ]}
                />
              </div>

              {/* Available Time Slots */}
              {Object.keys(availability).length > 0 && (
                <div className="mb-6">
                  <div className="text-lg font-medium text-gray-700 mb-2">Available Hours</div>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    {Object.entries(availability).map(([day, { open, close }]) => (
                      <div key={day} className="flex justify-between">
                        <span className="font-semibold text-gray-700">{day}:</span>
                        <span className="text-gray-600">{open} - {close}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 text-lg rounded-xl shadow-md transition-all duration-300"
                disabled={isLoading.submit}
              >
                {isLoading.submit ? "Booking..." : "Confirm Appointment"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
