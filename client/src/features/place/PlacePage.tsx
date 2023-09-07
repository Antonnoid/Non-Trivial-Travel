import React, {useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Rate} from 'antd';
import './styles/stylesPage.scss';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Image, Place} from './type';
import {RootState, useAppDispatch} from '../../redux/store';
import ImageItem from '../image/ImageItem';
import CommentsListPage from '../comment/CommentsListPage';
import starImg from './img/5-Star.png';
import * as api from './api';
import {addRating} from '../rating/ratingsSlice';

import 'swiper/css';

import 'swiper/css/navigation';
import 'swiper/css/effect-creative';
import '../swiper/styles/style.scss';
import {EffectFade, Navigation} from 'swiper/modules';

function PlacePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(0);
  const {placeId} = useParams();
  const places = useSelector((store: RootState) => store.places.places);
  const images = useSelector((store: RootState) => store.images.images);
  let ourPlace: Place | undefined;
  let ourImages;
  if (placeId) {
    ourPlace = places.find((place: Place) => place.id === +placeId);
    ourImages = images.filter((image: Image) => image.placeId === +placeId)!!;
  }
  const handleRatingChange = (value: number): void => {
    setRating(value);
    if (ourPlace) {
      dispatch(addRating({rate: value, place: ourPlace}));
    }
  };

  return (
    <div className="placePage__container">
      {ourPlace ? (
        <div>
          <div className="placePage__contents">
            <div className="placePage__contents-header">
              <h1 className="placePage__contents-header-text">
                {ourPlace.title}
              </h1>
            </div>
            <div className="placePage__contents-rating">
              <img className="img-rating" src={starImg} alt="star" />
              <p className="points-rating" />
            </div>
            <Swiper
              spaceBetween={30}
              effect={'fade'}
              navigation={true}
              modules={[EffectFade, Navigation]}
              className="mySwiper"
            >
              {ourImages?.map((image: Image) => (
                <SwiperSlide key={image.id}>
                  <ImageItem image={image} />
                </SwiperSlide>
              ))}
            </Swiper>
            <h3>{ourPlace.description}</h3>
            <div className="rating">
              <Rate onChange={handleRatingChange} />
              <p>{rating}</p>
            </div>
            <div className="placePage__contents-desc">
              <h3>{ourPlace.description}</h3>
            </div>
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
