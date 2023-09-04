import React from 'react';
import {Link} from 'react-router-dom';
import {City} from './types/types';

export default function CityItem({
  onClick,
  city,
}: {
  onClick: () => void;
  city: City;
}): JSX.Element {
  return (
    <li className="drop-down__item">
      <Link onClick={onClick} to={`/cities/${city.id}`}>
        {city.name}
      </Link>
    </li>
  );
}
