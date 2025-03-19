import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import './swipe-news.css'

import { Pagination } from 'swiper/modules';

export default function SwipeNews() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          '@1.50': {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="swiper-news"
      >
        <SwiperSlide className="swiper-slide-news"></SwiperSlide>
        <SwiperSlide className="swiper-slide-news"></SwiperSlide>
        <SwiperSlide className="swiper-slide-news"></SwiperSlide>
        <SwiperSlide className="swiper-slide-news"></SwiperSlide>
        <SwiperSlide className="swiper-slide-news"></SwiperSlide>
        <SwiperSlide className="swiper-slide-news"></SwiperSlide>
        <SwiperSlide className="swiper-slide-news"></SwiperSlide>
        <SwiperSlide className="swiper-slide-news"></SwiperSlide>
        <SwiperSlide className="swiper-slide-news"></SwiperSlide>
      </Swiper>
    </>
  );
}
