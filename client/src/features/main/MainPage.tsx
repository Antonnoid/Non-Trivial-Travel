import React from 'react';
import CardsList from './CardsList';
import PlacesList from '../place/PlacesList';

export default function MainPage(): JSX.Element {
  return (
    <div>
      <CardsList />
      <PlacesList />
    </div>
  );
}
