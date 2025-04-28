"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Navigation from "../components/navigation";

const SlidingSections = () => {
  const newServices = ["/images/mri.jpg", "/images/dental.jpg", "/images/lab.jpg", "/images/whole building.jpg", "/images/physioteam.jpg", "/images/nurses.jpg", "/images/minor surgery.png"];
  const healthCampaign = ["/images/marburg1.png", "/images/marburg2.png", "/images/marburg3.png", "/images/marburg4.png", "/images/world cancer day.png"];
  const doctorSchedules = ["/images/10.jpg", "/images/11.jpg", "/images/12.jpg", "/images/13.jpg", "/images/14.jpg"];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation />
      
      <div className="pt-24">
        
        {/* New Healthcare Services Section */}
        <div className="py-8 md:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">New Healthcare Services Launched</h1>
            </div>

            <Swiper
              spaceBetween={10}
              slidesPerView={2} // Always show 2 slides (columns)
              loop={true}
              navigation
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 15 }, // 2 slides for small screens
                768: { slidesPerView: 3, spaceBetween: 20 }, // 3 slides for tablets
                1024: { slidesPerView: 4, spaceBetween: 30 }, // 4 slides for desktops
              }}>
              {newServices.map((image, index) => (
                <SwiperSlide key={index} className="flex justify-center">
                  <img src={image} alt={`New Service ${index + 1}`} className="w-full h-auto object-cover rounded-lg shadow-md" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Community Health Awareness Campaign */}
        <div className="py-8 md:py-12 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">Community Health Awareness Campaign</h1>
            </div>

            <Swiper
              spaceBetween={10}
              slidesPerView={2} // Always show 2 slides
              loop={true}
              navigation
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 15 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 30 },
              }}>
              {healthCampaign.map((image, index) => (
                <SwiperSlide key={index} className="flex justify-center">
                  <img src={image} alt={`Health Campaign ${index + 1}`} className="w-full h-auto object-cover rounded-lg shadow-md" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Doctors' Weekly Schedule */}
        <div className="py-8 md:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">Doctors' Weekly Schedule</h1>
            </div>

            <Swiper
              spaceBetween={10}
              slidesPerView={2} // Always show 2 slides
              loop={true}
              navigation
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 15 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 30 },
              }}>
              {doctorSchedules.map((image, index) => (
                <SwiperSlide key={index} className="flex justify-center">
                  <img src={image} alt={`Doctor Schedule ${index + 1}`} className="w-full h-auto object-cover rounded-lg shadow-md" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

      </div>
      
      {/* Footer Section */}
      <div className="bg-gray-100 py-6">
        <div className="text-center text-gray-700">
          <p>&copy; 2025 Legacy Hospital. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default SlidingSections;
