'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDoctorsPage() {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [editDoctor, setEditDoctor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const router = useRouter();
  const doctorsPerPage = 10;

  const defaultAvailability = {
    Monday: null,
    Tuesday: null,
    Wednesday: null,
    Thursday: null,
    Friday: null,
    Saturday: null,
    Sunday: null,
  };

  function generateTimeOptions() {
    const options = [];
    for (let h = 0; h < 24; h++) {
      for (let m of [0, 30]) {
        const hour = h.toString().padStart(2, '0');
        const minute = m.toString().padStart(2, '0');
        options.push(`${hour}:${minute}`);
      }
    }
    return options.map((time) => (
      <option key={time} value={time}>{formatTime12h(time)}</option>
    ));
  }

  function formatTime12h(time) {
    const [hourStr, minute] = time.split(':');
    let hour = parseInt(hourStr);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  }

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin/login');
    } else {
      fetchDepartmentsWithDoctors();
    }
  }, [router]);

  const fetchDepartmentsWithDoctors = async () => {
    try {
      const res = await fetch('/api/department');
      const json = await res.json();
      const departments = json.data || [];

      setDepartments(departments);

      const allDoctors = [];
      departments.forEach((dept) => {
        const departmentName = dept.name || dept.attributes?.name || 'Unknown';
        const doctorList = dept.doctors || dept.attributes?.doctors || [];
        doctorList.forEach((doc) => {
          allDoctors.push({
            ...doc,
            departmentName,
            internalId: doc.id || doc.attributes?.id,
          });
        });
      });

      setDoctors(allDoctors);
    } catch (err) {
      console.error('Error fetching departments with doctors:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this doctor?')) return;

    try {
      const res = await fetch(`/api/doctor?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDoctors((prev) => prev.filter((doc) => doc.internalId !== id));
      } else {
        console.error('Failed to delete');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const filteredDoctors = doctors.filter((doc) => {
    const name = doc.name || doc.attributes?.name || '';
    const departmentName = doc.departmentName || '';
    const nameMatch = name.toLowerCase().includes(search.toLowerCase());
    const deptMatch = departmentFilter
      ? departmentName.toLowerCase() === departmentFilter.toLowerCase()
      : true;
    return nameMatch && deptMatch;
  });

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    const valA = a[sortField]?.toLowerCase?.() || '';
    const valB = b[sortField]?.toLowerCase?.() || '';
    return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  const indexOfLast = currentPage * doctorsPerPage;
  const indexOfFirst = indexOfLast - doctorsPerPage;
  const paginatedDoctors = sortedDoctors.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Doctor Management</h1>
          <button
            onClick={() => alert('Redirect to Add Doctor Form')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add New Doctor
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded w-full sm:w-64"
          />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="p-2 border rounded w-full sm:w-64"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => {
              const name = dept.name || dept.attributes?.name;
              return name ? (
                <option key={dept.id} value={name}>{name}</option>
              ) : null;
            })}
          </select>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden border">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Doctors Directory</h2>
            <p className="text-sm text-gray-500">Manage all doctors and their schedules</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr className="text-gray-600 uppercase text-xs">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Department</th>
                  <th className="px-6 py-3">Schedule</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedDoctors.map((doc) => {
                  const name = doc.name;
                  const availability = {
                    ...defaultAvailability,
                    ...(doc.availability || {}),
                  };

                  return (
                    <tr key={doc.internalId} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{name}</td>
                      <td className="px-6 py-4">{doc.departmentName}</td>
                      <td className="px-6 py-4 align-top">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
                          {Object.entries(defaultAvailability).map(([day]) => {
                            const hasAvailability = availability[day];
                            return (
                              <div key={day} className="flex justify-between items-center gap-2">
                                <span className="font-medium w-24">{day}</span>
                                {editDoctor?.internalId === doc.internalId ? (
                                  hasAvailability ? (
                                    <div className="flex gap-1">
                                      <select
                                        className="border p-1 rounded text-xs"
                                        value={editDoctor.availability?.[day]?.open || ''}
                                        onChange={(e) => setEditDoctor((prev) => ({
                                          ...prev,
                                          availability: {
                                            ...prev.availability,
                                            [day]: {
                                              ...prev.availability[day],
                                              open: e.target.value,
                                            },
                                          },
                                        }))}
                                      >
                                        {generateTimeOptions()}
                                      </select>
                                      <span>-</span>
                                      <select
                                        className="border p-1 rounded text-xs"
                                        value={editDoctor.availability?.[day]?.close || ''}
                                        onChange={(e) => setEditDoctor((prev) => ({
                                          ...prev,
                                          availability: {
                                            ...prev.availability,
                                            [day]: {
                                              ...prev.availability[day],
                                              close: e.target.value,
                                            },
                                          },
                                        }))}
                                      >
                                        {generateTimeOptions()}
                                      </select>
                                    </div>
                                  ) : (
                                    <span className="text-gray-500">Not available</span>
                                  )
                                ) : (
                                  <span className="text-gray-500">
                                    {hasAvailability?.open && hasAvailability?.close
                                      ? `${hasAvailability.open} - ${hasAvailability.close}`
                                      : 'Not available'}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                          {editDoctor?.internalId === doc.internalId && (
                            <div className="col-span-2 text-right mt-2 flex justify-end gap-2">
                              <button
                                onClick={async () => {
                                  const res = await fetch('/api/updateDoctor', {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      id: doc.internalId,
                                      data: { availability: editDoctor.availability },
                                    }),
                                  });
                                  if (res.ok) {
                                    const updated = await res.json();
                                    setDoctors((prev) =>
                                      prev.map((d) => (d.internalId === updated.updated.id ? updated.updated : d))
                                    );
                                    setEditDoctor(null);
                                  } else alert('Failed to save');
                                }}
                                className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 text-xs"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditDoctor(null)}
                                className="text-gray-600 border px-3 py-1 rounded hover:bg-gray-100 text-xs"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => setEditDoctor({
                              ...doc,
                              availability: {
                                ...defaultAvailability,
                                ...(doc.availability || {}),
                              },
                            })}
                            className="bg-white border p-2 rounded hover:bg-gray-100"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(doc.internalId)}
                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                            title="Delete"
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-4">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Previous</button>
          <span className="text-sm">Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
}
