import React from 'react';
import {Image} from './type';
import './styles/styles.scss';

function ImageItem({image}: {image: Image}): JSX.Element {
  return <img className="images-img" src={image.url} alt="..." />;
}

export default ImageItem;
