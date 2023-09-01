import React from 'react'
import { Image } from './type'

function ImageItem({image}:{image:Image}):JSX.Element {
  return (
    <img src={image.url} alt="..." />
  )
}

export default ImageItem