import React from 'react';
import CardsList from './CardsList';
import PlacesList from '../place/PlacesList';
import FormAdd from '../place/FormAdd';

export default function MainPage(): JSX.Element {
  return (
    <div>
      <FormAdd />
      <CardsList />
      <PlacesList />
    </div>
  );
}
