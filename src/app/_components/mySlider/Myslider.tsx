'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useRef, useState } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SlideData {
  image: string;
  title: string;
  subtitle: string;
  buttons?: { label: string; variant: 'solid' | 'outline' }[];
}

interface MySliderProps {
  slides: SlideData[];
  spaceBetween?: number;
  slidesPerView?: number;
}

export default function MySlider({ slides, spaceBetween = 0, slidesPerView = 1 }: MySliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handleSlideChange = (swiper: any) => {
    setAnimating(true);
    setActiveIndex(swiper.activeIndex);
    setTimeout(() => setAnimating(false), 50);
  };

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        loop
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }}
        pagination={{ clickable: true, bulletActiveClass: 'bg-red-500! opacity-100 w-20 h-20' }}
        onSlideChange={handleSlideChange}
        className="w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-[420px] overflow-hidden">
              {/* Green overlay */}
              <div className="absolute inset-0 bg-green-500/60 z-10" />
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* Text content with animation */}
              <div
                key={activeIndex} // re-triggers animation on slide change
                className="absolute inset-0 z-20 flex flex-col justify-center px-12 max-w-lg"
                style={{
                  animation: 'slideInLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                }}
              >
                <h1 className="text-white font-extrabold text-3xl md:text-4xl leading-tight mb-2">
                  {slide.title}
                </h1>
                <p className="text-white/90 text-sm md:text-base mb-6">{slide.subtitle}</p>

                <div className="flex gap-3 flex-wrap">
                  {slide.buttons?.map((btn, j) => (
                    <button
                      key={j}
                      className={
                        btn.variant === 'solid'
                          ? 'bg-white text-green-600 font-semibold px-5 py-2 rounded hover:bg-green-50 transition text-sm'
                          : 'border border-white text-white font-semibold px-5 py-2 rounded hover:bg-white/10 transition text-sm'
                      }
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom nav buttons */}
      <button className="custom-prev absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center shadow transition">
        ‹
      </button>
      <button className="custom-next absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center shadow transition">
        ›
      </button>

      {/* Custom pagination */}
      <div className="custom-pagination absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2" />

      {/* Keyframe animation */}
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}