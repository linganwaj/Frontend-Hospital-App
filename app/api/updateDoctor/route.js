import { NextResponse } from 'next/server';

export async function PUT(req) {
  try {
    const { id, data } = await req.json();

    if (!id || !data) {
      return NextResponse.json({ error: 'Missing id or data' }, { status: 400 });
    }

    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const updateRes = await fetch(`${STRAPI_URL}/api/doctors/update-availability`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({ id, data }),
    });

    const result = await updateRes.json();

    if (!updateRes.ok) {
      console.error('❌ Failed to update doctor:', result);
      return NextResponse.json(result, { status: 500 });
    }

    return NextResponse.json({ message: 'Doctor updated', updated: result.data });
  } catch (error) {
    console.error('❌ Internal error in updateDoctor API:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
