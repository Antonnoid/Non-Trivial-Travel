/* eslint-disable import/no-extraneous-dependencies */
import React, {useRef, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-cards';

import './styles/style.scss';
import {EffectCards, Navigation} from 'swiper/modules';

export default function SwiperItem(): JSX.Element {
  return (
    <Swiper grabCursor modules={[EffectCards, Navigation]} className="mySwiper">
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 5</SwiperSlide>
      <SwiperSlide>Slide 6</SwiperSlide>
      <SwiperSlide>Slide 7</SwiperSlide>
      <SwiperSlide>Slide 8</SwiperSlide>
      <SwiperSlide>Slide 9</SwiperSlide>
    </Swiper>
  );
}
