const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';

// ✅ Fetch ALL departments (both draft + published)
export const getDepartments = async () => {
  const res = await fetch(`${API_URL}/departments?publicationState=preview`);
  const data = await res.json();
  return data.data; // Strapi returns { data: [...] }
};

// ✅ Fetch doctors filtered by department ID (both draft + published)
export const getDoctorsByDepartment = async (departmentId) => {
  const res = await fetch(`${API_URL}/doctors?filters[department][id][$eq]=${departmentId}&publicationState=preview`);
  const data = await res.json();
  return data.data;
};

export const getDoctorAvailability = async (doctorId) => {
  try {
    const res = await fetch(`${API_URL}/doctors?filters[id][$eq]=${doctorId}`);
    const { data } = await res.json();

    if (!data || data.length === 0 || !data[0].availability) {
      console.warn("Doctor availability not found for ID:", doctorId);
      return {};
    }

    return data[0].availability;
  } catch (error) {
    console.error("Error fetching doctor availability:", error);
    return {};
  }
};

// ✅ Post booking form data (already correct)
export const bookAppointment = async (formData) => {
  const res = await fetch('/api/book-appointment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Booking failed');
  }

  return res.json();
};
