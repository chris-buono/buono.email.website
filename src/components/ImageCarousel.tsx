import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Pagination, Scrollbar, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import Image from 'next/image';
import { CarouselProps } from '@/types/global';

const ImageCarousel: React.FC<CarouselProps> = ({ className, images }) => {
  return (
    <section className="mb-8">
        <div className={`overflow-hidden relative h-120 rounded-lg${className ? ` ${className}` : ''}`}>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={10}
                slidesPerView={1}
                navigation={{ prevEl: '.sw-prev', nextEl: '.sw-next' }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                a11y={{ enabled: true, containerMessage: 'Image Carousel', prevSlideMessage: 'Previous Slide', nextSlideMessage: 'Next Slide' }}
                className="w-full h-full"
                loop={true}
                pagination={true}
            >
            {images.map((img, index) => (
                <SwiperSlide key={index} className="h-full rounded-lg">
                    <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className={img.fill ? 'object-cover' : 'object-contain'}/>
                </SwiperSlide>
            ))}
            </Swiper>
            <button className="sw-prev rounded-r-sm absolute left-0 bottom-1 transform -translate-y-1/2 bg-gray-700 text-white py-1 px-3 z-10 text-sm opacity-50 hover:opacity-80 cursor-pointer" type="button" aria-label="Previous Slide">Prev</button>
            <button className="sw-next rounded-l-sm absolute right-0 bottom-1 transform -translate-y-1/2 bg-gray-700 text-white py-1 px-3 z-10 text-sm opacity-50 hover:opacity-80 cursor-pointer" type="button" aria-label="Next Slide">Next</button>
        </div>
    </section>
  );
};

export default ImageCarousel;