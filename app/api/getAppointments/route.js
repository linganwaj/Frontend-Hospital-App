// app/api/getAppointments/route.js
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/appointments?populate=*`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error from Strapi API:', errorText);
      return new Response(JSON.stringify({ error: 'Failed to fetch appointments' }), { status: 500 });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
