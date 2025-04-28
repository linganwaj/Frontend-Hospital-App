'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin/login');
    } else {
      fetchAppointments();
    }
  }, [router]);

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/getAppointments');
      const data = await res.json();
      console.log("Fetched appointments:", data);

      const appointmentsData = data.data.map((appt) => ({
        id: appt.id, // ✅ this is 99 — real ID
        documentId: appt.documentId, // ✅ optional for display
        name: appt.name || 'N/A',
        email: appt.email || 'N/A',
        date: appt.date || 'N/A',
        state: appt.state || 'Pending',
        doctorName: appt.doctor || 'N/A',
        departmentName: appt.department || 'N/A',
      }));
   
      setAppointments(appointmentsData);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id, newState) => {
    try {
      const res = await fetch('/api/update-appointment-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, state: newState }),
      });
  
      const result = await res.json();
      if (res.ok) {
        console.log("Update successful:", result.message);
        fetchAppointments(); // Refresh the list after update
      } else {
        console.error("Error updating:", result.message);
        alert(result.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Something went wrong.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-700 text-lg">
        Loading appointments...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">📅 Booked Appointments</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* No appointments */}
        {appointments.length === 0 ? (
          <p className="text-gray-600 text-center">No appointments yet.</p>
        ) : (
          <ul className="grid gap-4">
            {appointments.map((appt) => (
              <li
                key={appt.id}
                className="bg-white rounded-lg shadow p-4 border border-gray-200"
              >
                <h2 className="text-lg font-semibold text-blue-700">{appt.name}</h2>
                <p className="text-gray-700">{appt.email}</p>
                <p className="text-sm text-gray-500">Date: {appt.date}</p>
                <div className="mt-2 text-sm text-gray-600">
                  <p>Doctor: <span className="font-medium">{appt.doctorName}</span></p>
                  <p>Department: <span className="font-medium">{appt.departmentName}</span></p>
                  <p>Status: <span className="font-medium">{appt.state}</span></p>
                </div>

                {/* Buttons only if Pending */}
                {appt.state.toLowerCase() === 'pending' && (
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => updateAppointmentStatus(appt.id, 'Confirmed')}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => updateAppointmentStatus(appt.id, 'Cancelled')}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
