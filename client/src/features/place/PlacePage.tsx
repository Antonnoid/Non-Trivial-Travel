/* eslint-disable import/no-extraneous-dependencies */
// @ts-nocheck
import React, {useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Rate} from 'antd';
import './styles/stylesPage.scss';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {EffectFade, Navigation} from 'swiper/modules';
import {Image, Place} from './type';
import {RootState, useAppDispatch} from '../../redux/store';
import ImageItem from '../image/ImageItem';
import CommentsListPage from '../comment/CommentsListPage';
// import starImg from './img/5-Star.png';
// import * as api from './api';
import {addRating} from '../rating/ratingsSlice';

import 'swiper/css';

import 'swiper/css/navigation';
import 'swiper/css/effect-creative';
import '../swiper/styles/style.scss';

function PlacePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(0);
  const {placeId} = useParams();
  const places = useSelector((store: RootState) => store.places.places);
  const images = useSelector((store: RootState) => store.images.images);
  const ratings = useSelector((store: RootState) => store.ratings.ratings);
  const currentUser = useSelector((store: RootState) => store.auth.user);
  let ourPlace: Place | undefined;
  let ourImages;
  let ourRating;
  if (placeId) {
    ourPlace = places.find((place: Place) => place.id === +placeId);
    ourImages = ourPlace?.Images;
    ourRating = ratings.filter(
      (el) => el.itemId === +placeId && el.type === 'place'
    );
  }
  const usersId = ourRating?.map((el) => el.userId);
  const checkId = usersId?.filter((el) => el === currentUser?.id);
  console.log(currentUser);

  const handleRatingChange = (value: number): void => {
    setRating(value);
    if (ourPlace) {
      dispatch(addRating({rate: value, place: ourPlace}));
    }
  };

  return (
    <div className="placePage__container">
      {ourPlace ? (
        <div className="placePage__contents">
          <div className="placePage__contents-header">
            <h1 className="placePage__contents-header-text">
              {ourPlace.title}
            </h1>
          </div>
          {!checkId?.length && currentUser && (
            <div className="rating">
              <p className="rating-number">Оценить место</p>
              <Rate onChange={handleRatingChange} />
            </div>
          )}

          <Swiper
            spaceBetween={30}
            effect="fade"
            navigation
            modules={[EffectFade, Navigation]}
            className="mySwiper"
          >
            {ourImages?.map((image: Image) => (
              <SwiperSlide key={image.id}>
                <ImageItem image={image} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="placePage__contents-desc">
            <h3>{ourPlace.description}</h3>
          </div>
          <div className="placePage__contents-comments">
            <CommentsListPage />
          </div>
        </div>
      ) : (
        <div>
          <p>Ты ошибся переулком</p>
        </div>
      )}
    </div>
  );
}

export default PlacePage;
