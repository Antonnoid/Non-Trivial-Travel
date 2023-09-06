import React from 'react';
import {useSelector} from 'react-redux';
import CardsList from './CardsList';
import PlacesList from '../place/PlacesList';
import FormAdd from '../place/FormAdd';
import BundlesList from '../bundle/BundlesList';
import RoutesList from '../routes/RoutesList';
import {RootState} from '../../redux/store';

export default function MainPage(): JSX.Element {
  const user = useSelector((store: RootState) => store.auth.user);
  return (
    <div>
      {user && <FormAdd />}
      <RoutesList />
      <BundlesList />
      <PlacesList />
    </div>
  );
}
