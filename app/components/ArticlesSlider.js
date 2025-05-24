'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { getArticles } from '../../utils/api';

const ArticlesSlider = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getArticles();
      setArticles(data);
    };
    fetchData();
  }, []);

  if (!articles || articles.length < 1) {
    return null;
  }

  return (
    <div className="[&_.swiper-pagination]:mt-4 [&_.swiper-pagination]:relative">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 15 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
      >
        {articles.map((article) => {
          const { id, title, coverImage, slug } = article;

          if (!coverImage || !slug) return null;

          return (
            <SwiperSlide key={id} className="flex justify-center px-1">
              <Link href={`/articles/${slug}`} className="w-full max-w-sm">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden transition transform hover:scale-105 hover:shadow-md">
                  
                  {/* Shorter image area */}
                  <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${coverImage}`}
                      alt={`Cover image for ${title}`}
                      className="w-full h-full object-contain transition duration-300"
                    />
                  </div>

                  {/* Title - tighter padding and 1-line truncate */}
                  <div className="p-3">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 text-center truncate">
                      {title ?? 'Untitled'}
                    </h3>
                  </div>

                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ArticlesSlider;
