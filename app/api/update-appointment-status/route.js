import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { id, state, cancellationReason } = await req.json();

    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://62.171.162.188:1337';
    const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    if (!id || !state) {
      return NextResponse.json({ message: 'Missing id or state.' }, { status: 400 });
    }

    console.log('Trying to update appointment with id:', id);

    // ✅ Step 1: Find internal Strapi ID
    const findRes = await fetch(`${STRAPI_URL}/api/appointments?filters[id][$eq]=${id}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    });

    const findData = await findRes.json();
    console.log('Found appointment by filter:', findData);

    if (!findData?.data?.length) {
      console.error('Appointment not found for id:', id);
      return NextResponse.json({ message: 'Appointment not found.' }, { status: 404 });
    }

    const realAppointmentId = findData.data[0].id;

    // ✅ Step 2: Prepare body to send
    const updatePayload = {
      id: realAppointmentId,
      state,
    };

    if (state.toLowerCase() === 'cancelled' && cancellationReason) {
      updatePayload.cancellationReason = cancellationReason;
    }

    // ✅ Step 3: Send update to Strapi custom controller
    const updateRes = await fetch(`${STRAPI_URL}/api/appointments/update-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify(updatePayload),
    });

    const updateData = await updateRes.json();

    if (!updateRes.ok) {
      console.error('Strapi update error:', updateData);
      return NextResponse.json({ message: 'Failed to update appointment.', strapiError: updateData }, { status: 500 });
    }

    return NextResponse.json({ message: 'Appointment updated successfully.', updated: updateData }, { status: 200 });

  } catch (error) {
    console.error('Internal server error:', error);
    return NextResponse.json({ message: 'Internal server error.', error: error.message }, { status: 500 });
  }
}
