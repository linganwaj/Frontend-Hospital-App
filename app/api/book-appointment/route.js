export async function POST(request) {
  try {
    const formData = await request.json();

    // ✅ Validate the new structure: doctor and department are strings!
    if (!formData.data?.name ||
        !formData.data?.email ||
        !formData.data?.phonenumber ||
        !formData.data?.dob ||
        !formData.data?.date ||
        !formData.data?.doctor ||
        !formData.data?.department) {
      return new Response(JSON.stringify({
        error: "Missing required fields"
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // ✅ Send to Strapi directly
    const strapiResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify(formData), // already { data: { ... } }
    });

    const responseData = await strapiResponse.json();
    console.log("Returned data from Strapi:", responseData);

    if (!strapiResponse.ok) {
      return new Response(JSON.stringify({
        error: responseData.error?.message || 'Booking failed',
      }), {
        status: strapiResponse.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ data: responseData.data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("API POST error:", error);
    return new Response(JSON.stringify({
      error: error.message || 'Internal server error',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
