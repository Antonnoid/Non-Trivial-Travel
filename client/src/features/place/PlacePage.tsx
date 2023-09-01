import React from 'react'
import {useSelector} from 'react-redux';
import { Place } from './type'
import { RootState, useAppDispatch } from '../../redux/store'

function PlacePage({place}:{place:Place}):JSX.Element {
const dispatch = useAppDispatch()
const images = useSelector((store:RootState) => store)
  return (
    <div>
      <h1>{place.title}</h1>
      <div>{place.rating}</div>
      <div>Map Photos</div>
      <h3>{place.description}</h3>
    </div>
  )
}

export default PlacePage