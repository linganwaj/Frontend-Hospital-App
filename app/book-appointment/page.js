'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '../components/ui/button';
import Navigation from "../components/navigation";
import { getDepartments, getDoctorsByDepartment, getDoctorAvailability } from '../../utils/api';

export default function BookAppointment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const doctorId = searchParams.get('doctorId');

  const origin = typeof window === 'undefined' ? 'http://localhost:3000' : window.location.origin;

  const [formData, setFormData] = useState({
    name: "",
    phonenumber: "",
    email: "",
    department: "",
    doctor: doctorId || "",
    date: "",
  });

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [availability, setAvailability] = useState({});
  const [isLoading, setIsLoading] = useState({ departments: false, doctors: false, slots: false, submit: false });
  const [error, setError] = useState(null);

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      setIsLoading(prev => ({ ...prev, departments: true }));
      try {
        const departmentsData = await getDepartments();
        setDepartments(departmentsData);
      } catch (error) {
        console.error('Error fetching departments:', error);
      } finally {
        setIsLoading(prev => ({ ...prev, departments: false }));
      }
    };
    fetchDepartments();
  }, []);

  // Fetch doctors when department changes
  useEffect(() => {
    if (formData.department) {
      const fetchDoctors = async () => {
        setIsLoading(prev => ({ ...prev, doctors: true }));
        try {
          const doctorsData = await getDoctorsByDepartment(formData.department);
          setDoctors(doctorsData);
          setFormData(prev => ({ ...prev, doctor: "" }));
        } catch (error) {
          console.error('Error fetching doctors:', error);
        } finally {
          setIsLoading(prev => ({ ...prev, doctors: false }));
        }
      };
      fetchDoctors();
    }
  }, [formData.department]);

  // Fetch availability when doctor changes
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
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    if (!date) {
      setFormData(prev => ({ ...prev, date: "" }));
      return;
    }
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
  
    const localDate = `${year}-${month}-${day}`;
  
    setFormData(prev => ({
      ...prev,
      date: localDate
    }));
  };


  const isDateAvailable = (date) => {
    if (!date || Object.keys(availability).length === 0) return false;
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    return availability.hasOwnProperty(dayName);
  };

  const getHighlightedDates = () => {
    if (Object.keys(availability).length === 0) return [];
    const today = new Date();
    const highlightedDates = [];

    for (let i = 0; i < 60; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      if (isDateAvailable(date)) {
        highlightedDates.push(new Date(date));
      }
    }
    return highlightedDates;
  };

  // ✅ Important: here we send doctor name and department name!
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
          email: formData.email.trim(),
          phonenumber: formData.phonenumber.trim(),
          date: formData.date,
          doctor: selectedDoctor?.attributes?.name || selectedDoctor?.name || '',
          department: selectedDepartment?.attributes?.name || selectedDepartment?.name || ''
        }
      };

      console.log('Submitting payload:', payload);

      const response = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log('API Response:', result);

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
      <Navigation className="relative z-10" />

      <div className="bg-green-500 bg-opacity-50 py-20 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Book Your Appointment</h1>
          <p className="mt-3 text-lg text-gray-600">Fill out the form below to schedule your visit</p>
        </div>
      </div>

      <div className="py-12 bg-white">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
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

              {/* Date */}
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
                <p className="mt-2 text-sm text-gray-500">
                  Available days: {Object.keys(availability).length > 0 ? Object.keys(availability).join(', ') : 'No available days'}
                </p>
              </div>

              {/* Time Slots */}
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">Available Hours*</label>
                {Object.entries(availability).map(([day, { open, close }]) => (
                  <p key={day} className="text-sm">
                    <strong>{day}:</strong> {open} - {close}
                  </p>
                ))}
              </div>

              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 text-lg"
                disabled={isLoading.submit}
              >
                {isLoading.submit ? 'Booking...' : 'Confirm Appointment'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
