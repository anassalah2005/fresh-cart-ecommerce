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
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }}
        pagination={{ 
          clickable: true, 
          el: '.custom-pagination',
          bulletClass: 'w-2.5 h-2.5 bg-white/30 rounded-full cursor-pointer transition-all duration-300',
          bulletActiveClass: 'w-8 bg-white! opacity-100' 
        }}
        onSlideChange={handleSlideChange}
        className="w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden group">
              {/* Sophisticated Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent z-10" />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-10" />
              
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-[10s] ease-linear"
              />

              {/* Text content with animation */}
              <div
                key={activeIndex} // re-triggers animation on slide change
                className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-20 max-w-2xl"
              >
                <div 
                   className="space-y-3"
                   style={{
                     animation: 'slideInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
                   }}
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-green-600/20 backdrop-blur-md border border-green-600/30 text-green-500 text-[10px] font-bold tracking-widest uppercase mb-1">
                    Exclusive Deal
                  </span>
                  <h1 className="text-white font-black text-2xl md:text-4xl lg:text-5xl leading-tight drop-shadow-2xl">
                    {slide.title}
                  </h1>
                  <p className="text-white/80 text-sm md:text-base max-w-xl font-medium leading-relaxed drop-shadow-lg">
                    {slide.subtitle}
                  </p>

                  <div className="flex gap-3 pt-2 flex-wrap">
                    {slide.buttons?.map((btn, j) => (
                      <button
                        key={j}
                        className={
                          btn.variant === 'solid'
                            ? 'bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg hover:-translate-y-1 active:scale-95 text-sm'
                            : 'bg-white/10 backdrop-blur-md text-white font-bold px-6 py-2.5 rounded-xl hover:bg-white/20 transition-all hover:-translate-y-1 active:scale-95 text-sm border border-white/30'
                        }
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom nav buttons */}
      <button className="custom-prev absolute left-6 top-1/2 -translate-y-1/2 z-30 glass hover:bg-primary hover:text-white rounded-full w-12 h-12 flex items-center justify-center shadow-2xl transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0">
        <span className="text-2xl">‹</span>
      </button>
      <button className="custom-next absolute right-6 top-1/2 -translate-y-1/2 z-30 glass hover:bg-primary hover:text-white rounded-full w-12 h-12 flex items-center justify-center shadow-2xl transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0">
        <span className="text-2xl">›</span>
      </button>

      {/* Custom pagination */}
      <div className="custom-pagination absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3 items-center" />

      {/* Keyframe animation */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}