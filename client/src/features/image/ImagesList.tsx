import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';
import ImageItem from './ImageItem';
import { Image } from './type';
import { imagesInit } from './ImagesSlice';

function ImageList(): JSX.Element {
  const dispatch = useAppDispatch();
  const images = useSelector((store: RootState) => store.images.images);

  useEffect(()=>{
    dispatch(imagesInit())
  },[])
  return (
    <div>
      {images.map((image: Image) => (
        <ImageItem image={image} key={image.id} />
      ))}
    </div>
  );
}

export default ImageList;
