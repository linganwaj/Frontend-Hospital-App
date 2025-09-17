import { NextResponse } from 'next/server';

export async function POST(req) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://62.171.162.188:1337';
  const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  try {
    const { title, content, slug, coverImage } = await req.json();

    if (!title || !content || !coverImage || !slug) {
      return NextResponse.json(
        { message: 'Missing title, content, slug, or cover image.' },
        { status: 400 }
      );
    }

    const createRes = await fetch(`${STRAPI_URL}/api/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          title,
          content,
          slug,
          coverImage,
        },
      }),
    });

    const result = await createRes.json();

    if (!createRes.ok) {
      return NextResponse.json(
        { message: 'Failed to add article.', strapiError: result },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Article added.', article: result }, { status: 201 });
  } catch (error) {
    console.error('Error adding article:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
