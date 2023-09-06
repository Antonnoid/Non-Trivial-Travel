import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import CityItem from '../city/CityItem';
import {City} from '../city/types/types';

export default function DropList({
  allCity,
  dropDownRef,
  cities,
  setPlaceholder,
  onClickCity,
}: {
  allCity: boolean;
  dropDownRef: React.MutableRefObject<HTMLUListElement | null>;
  cities: City[];
  setPlaceholder: React.Dispatch<React.SetStateAction<string>>;
  onClickCity: (e?: any) => void;
}): JSX.Element {
  return (
    <ul className="drop-down" ref={dropDownRef}>
      {cities.length === 0 && (
        <li className="drop-down__item">Такого города нет</li>
      )}
      {allCity && (
        <li className="drop-down__item">
          <Link
            onClick={() => {
              setPlaceholder('Все города');
              onClickCity();
            }}
            to="/"
          >
            Все города
          </Link>
        </li>
      )}
      {cities.length > 0 &&
        cities.map((city) => (
          <CityItem onClick={onClickCity} key={city.id} city={city} />
        ))}
    </ul>
  );
}
