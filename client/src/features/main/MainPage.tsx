import React from 'react';
import PlacesList from '../place/PlacesList';
import BundlesList from '../bundle/BundlesList';
import RoutesList from '../routes/RoutesList';

export default function MainPage(): JSX.Element {
  return (
    <div>
      <RoutesList />
      <BundlesList />
      <PlacesList />
    </div>
  );
}
