'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getArticles } from '../../utils/api';
import Navigation from '../components/navigation';

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedArticles = await getArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };
    fetchData();
  }, []);

  if (!articles || articles.length === 0) {
    return <p className="text-center py-10">No articles found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Latest Articles</h1>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
            const { id, title, content, coverImage, slug } = article;

            return (
              <div
                key={id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
              >
                {coverImage && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${coverImage}`}
                    alt={title}
                    className="w-full h-52 object-cover"
                  />
                )}

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <h2 className="text-xl font-semibold mb-2 line-clamp-2 text-gray-800">
                    {slug ? (
                      <Link href={`/articles/${slug}`} className="hover:underline">
                        {title}
                      </Link>
                    ) : (
                      title
                    )}
                  </h2>
                  <div
                    className="text-sm text-gray-600 prose line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <footer className="bg-gray-100 py-6 mt-16">
        <div className="text-center text-gray-700">
          <p>&copy; 2025 Legacy Clinics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
