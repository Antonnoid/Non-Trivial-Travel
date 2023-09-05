import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Route } from './type'
import PlaceCard from '../place/PlaceCard'

const RoutePage = ():JSX.Element => {
  const {routeId} = useParams()
  const routes = useSelector((store:RootState) => store.routes.routes)

  let ourRoute;
  let ourPlaces;
  if(routeId){
    ourRoute = routes.find((route: Route) => route.id === +routeId)
    ourPlaces = ourRoute?.Route_places.map((routePlace) => routePlace.Place).flat()
  }
  return (
    <div>
      <h1>{ourRoute?.title}</h1>
      <h2>{ourRoute?.description}</h2>
      <div>
        {ourPlaces?.map((place) => (<PlaceCard place={place} key={place.id}/>))}
      </div>
    </div>
  )
}

export default RoutePage