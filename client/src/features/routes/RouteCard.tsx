import React from 'react'
import { Route } from './type'

const RouteCard = ({route}:{route: Route}):JSX.Element => {
  return (
    <div className='routeCard'>
      <div className='route'>
        <div className='route__body'>
          <h1 className='route__title'>{route.title}</h1>
          <p className='route__description'>{route.description}</p>
        </div>
      </div>
    </div>
  )
}

export default RouteCard