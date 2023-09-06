import React from 'react';
import './styles/stylesPage.scss';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Image, Place} from './type';
import {RootState} from '../../redux/store';
import ImageItem from '../image/ImageItem';
import CommentsListPage from '../comment/CommentsListPage';
import starImg from './img/5-Star.png';

function PlacePage(): JSX.Element {
  const {placeId} = useParams();
  const places = useSelector((store: RootState) => store.places.places);
  const images = useSelector((store: RootState) => store.images.images);
  let ourPlace;
  let ourImages;
  if (placeId) {
    ourPlace = places.find((place: Place) => place.id === +placeId)!!;
    ourImages = images.filter((image: Image) => image.placeId === +placeId)!!;
  }

  return (
    <div className="placePage__container">
      {ourPlace ? (
        <>
          <div className="placePage__contents">
            <div className="placePage__contents-header">
              <h1 className="placePage__contents-header-text">
                {ourPlace.title}
              </h1>
            </div>
            <div className="placePage__contents-rating">
              <img className="img-rating" src={starImg} alt="star" />
              <p className="points-rating">{ourPlace.rating}</p>
            </div>
            <div className="placePage__contents-img">
              {ourImages?.map((image: Image) => (
                <ImageItem image={image} key={image.id} />
              ))}
            </div>
            <div className="placePage__contents-desc">
              <h3>{ourPlace.description}</h3>
            </div>
          </div>
          <div className="placePage__contents-comments">
            <CommentsListPage />
          </div>
        </>
      ) : (
        <div>
          <p>Ты ошибся переулком</p>
        </div>
      )}
    </div>
  );
}

export default PlacePage;
