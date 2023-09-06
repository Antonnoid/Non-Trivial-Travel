import React from 'react';
import PlacesList from '../place/PlacesList';
import RoutesList from '../routes/RoutesList';
import BundlesList from '../bundle/BundlesList';

export default function CityPage(): JSX.Element {
  return (
    <div className="container">
      <PlacesList />
      <RoutesList />
      <BundlesList />
    </div>
  );
}
