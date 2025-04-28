export async function POST(request) {
    try {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
      const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  
      if (!STRAPI_URL || !STRAPI_TOKEN) {
        throw new Error('Strapi environment variables not configured');
      }
  
      const doctorData = await request.json();
  
      const strapiResponse = await fetch(`${STRAPI_URL}/api/doctors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${STRAPI_TOKEN}`
        },
        body: JSON.stringify({ data: doctorData })
      });
  
      const responseData = await strapiResponse.json();
  
      if (!strapiResponse.ok) {
        return new Response(JSON.stringify({
          error: responseData.error?.message || 'Doctor creation failed'
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
      console.error('Doctor API Error:', error);
      return new Response(JSON.stringify({
        error: error.message || 'Internal server error'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
  