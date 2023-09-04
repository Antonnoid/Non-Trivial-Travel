import React from 'react'
import { Bundle } from './type'

const BundleCard = ({bundle}: {bundle:Bundle}):JSX.Element => {
  return (
    <div>
      <div className='bundle'>
        <div className='bundle__body'>
          <h1 className='bundle__title'>{bundle.title}</h1>
          <p className='bundle__description'>{bundle.description}</p>
        </div>
      </div>
      
    </div>
  )
}

export default BundleCard