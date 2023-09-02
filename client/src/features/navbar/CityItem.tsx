import React from 'react';
import {Link} from 'react-router-dom';
import {City} from './types/types';

export default function CityItem({city}: {city: City}): JSX.Element {
  return (
    <li className="drop-down__item">
      <Link to={`/cities/${city.id}`}>{city.name}</Link>
    </li>
  );
}
