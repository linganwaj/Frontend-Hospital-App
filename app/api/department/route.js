// POST: create a department
export async function POST(request) {
  try {
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
    const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    if (!STRAPI_URL || !STRAPI_TOKEN) {
      throw new Error('Strapi environment variables not configured');
    }

    const departmentData = await request.json();

    const strapiResponse = await fetch(`${STRAPI_URL}/api/departments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify({ data: departmentData })
    });

    const responseData = await strapiResponse.json();

    if (!strapiResponse.ok) {
      return new Response(JSON.stringify({
        error: responseData.error?.message || 'Department creation failed'
      }), {
        status: strapiResponse.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(responseData.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Department API Error:', error);
    return new Response(JSON.stringify({
      error: error.message || 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// ✅ GET: fetch all departments
export async function GET() {
  try {
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
    const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    if (!STRAPI_URL || !STRAPI_TOKEN) {
      throw new Error('Strapi environment variables not configured');
    }

    const strapiResponse = await fetch(`${STRAPI_URL}/api/departments?populate=*`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    });

    const data = await strapiResponse.json();

    if (!strapiResponse.ok) {
      return new Response(JSON.stringify({
        error: data.error?.message || 'Failed to fetch departments'
      }), {
        status: strapiResponse.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Department GET API Error:', error);
    return new Response(JSON.stringify({
      error: error.message || 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
