'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
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
      const formatted = data.data.map((appt) => ({
        id: appt.id,
        documentId: appt.documentId,
        name: appt.name || 'N/A',
        email: appt.email || 'N/A',
        phonenumber: appt.phonenumber || 'N/A',
        dob: appt.dob || 'N/A',
        date: appt.date || 'N/A',
        state: appt.state || 'Pending',
        doctorName: appt.doctor || 'N/A',
        departmentName: appt.department || 'N/A',
      }));
      setAppointments(formatted);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id, newState) => {
    let cancellationReason = null;

    if (newState.toLowerCase() === 'cancelled') {
      cancellationReason = prompt('Please enter a reason for cancelling this appointment:');
      if (!cancellationReason || cancellationReason.trim() === '') {
        alert('Cancellation reason is required.');
        return;
      }
    }

    try {
      const res = await fetch('/api/update-appointment-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          state: newState,
          ...(cancellationReason && { cancellationReason }),
        }),
      });

      const result = await res.json();
      if (res.ok) {
        alert(`Appointment successfully ${newState.toLowerCase()}.`);
        fetchAppointments();
      } else {
        alert(result.message || 'An error occurred while updating the appointment.');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('An unexpected error occurred.');
    }
  };

  const filteredAppointments = appointments.filter((appt) => {
    if (filter === 'all') return true;
    return appt.state.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Appointment Management</h1>
        {/* Filter */}
        <div className="mb-8">
          <p className="text-base font-medium text-gray-700 mb-2">Filter by status:</p>
          <div className="flex gap-3 flex-wrap">
            {['all', 'pending', 'confirmed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments */}
        {loading ? (
          <div className="text-center text-gray-600 py-20">Loading appointments...</div>
        ) : filteredAppointments.length === 0 ? (
          <p className="text-gray-600 text-center mt-20">No appointments found.</p>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appt) => (
              <div
                key={appt.id}
                className="flex justify-between items-center bg-white rounded-lg shadow p-5 border border-gray-200"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{appt.name}</h2>
                  <p className="text-sm text-gray-600">{appt.email}</p>
                  <p className="text-sm text-gray-600">📞 {appt.phonenumber}</p>
                  <p className="text-sm text-gray-600">🎂 {appt.dob}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    🗓 <strong>{appt.date}</strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    👨‍⚕️ <strong>{appt.doctorName}</strong> | 🏥 {appt.departmentName}
                  </p>
                  <p className="text-sm mt-1">
                    Status:{' '}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        appt.state === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : appt.state === 'Confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {appt.state}
                    </span>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end gap-2">
                  {appt.state.toLowerCase() === 'pending' && (
                    <>
                      <button
                        onClick={() => updateAppointmentStatus(appt.id, 'Confirmed')}
                        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => updateAppointmentStatus(appt.id, 'Cancelled')}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {appt.state.toLowerCase() === 'confirmed' && (
                    <button
                      onClick={() => updateAppointmentStatus(appt.id, 'Cancelled')}
                      className="bg-red-400 text-white px-4 py-1 rounded hover:bg-red-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
