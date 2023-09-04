import React from 'react';
import CardsList from './CardsList';
import PlacesList from '../place/PlacesList';
import FormAdd from '../place/FormAdd';
import BundlesList from '../bundle/BundlesList';

export default function MainPage(): JSX.Element {
  return (
    <div>
      <FormAdd />
      <CardsList />
      <BundlesList />
      <PlacesList />
    </div>
  );
}
