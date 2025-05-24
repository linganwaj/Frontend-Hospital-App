import { NextResponse } from 'next/server';

export async function GET() {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  try {
    const res = await fetch(`${STRAPI_URL}/api/articles?populate=*`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    });

    const data = await res.json();

    const formatted = data.data.map((item) => ({
      id: item.id,
      title: item.attributes.title,
      content: item.attributes.content,
      slug: item.attributes.slug,
      coverImage:
        item.attributes.coverImage?.data?.attributes?.url ||
        item.attributes.coverImage || // fallback if it's a direct URL
        null,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ message: 'Failed to fetch articles.' }, { status: 500 });
  }
}
