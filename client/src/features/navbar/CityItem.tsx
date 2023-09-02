import React from 'react';
import {City} from './types/types';

export default function CityItem({city}: {city: City}): JSX.Element {
  return (
    <li className="drop-down__item">
      <a href="/">{city.name}</a>
    </li>
  );
}
