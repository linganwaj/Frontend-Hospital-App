import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { id, title, content, slug, coverImage } = await req.json();

    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    if (!id || !title || !content || !slug) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    console.log('🔍 Looking for article with external id:', id);

    // Step 1: Find internal Strapi ID (by filtering on id field)
    const findRes = await fetch(`${STRAPI_URL}/api/articles?filters[id][$eq]=${id}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    });

    const findData = await findRes.json();
    console.log('🔍 Matched article entry (by filter):', findData);

    if (!findData?.data?.length) {
      console.error('❌ Article not found for id:', id);
      return NextResponse.json({ message: 'Article not found.' }, { status: 404 });
    }

    const realArticleId = findData.data[0].id;

    // Step 2: Prepare body
    const updatePayload = {
      data: {
        title,
        content,
        slug,
        ...(coverImage && { coverImage }),
      },
    };

    // Step 3: Send update request to Strapi
        const updateRes = await fetch(`${STRAPI_URL}/api/articles/${realArticleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
        body: JSON.stringify(updatePayload),
      });

    const updateData = await updateRes.json();
    console.log('✅ Strapi update response:', updateData);

    if (!updateRes.ok) {
      console.error('❌ Strapi update error:', updateData);
      return NextResponse.json({ message: 'Failed to update article.', strapiError: updateData }, { status: 500 });
    }

    return NextResponse.json({ message: 'Article updated successfully.', updated: updateData }, { status: 200 });

  } catch (error) {
    console.error('❌ Internal server error:', error);
    return NextResponse.json({ message: 'Internal server error.', error: error.message }, { status: 500 });
  }
}
