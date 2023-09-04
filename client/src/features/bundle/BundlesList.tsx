import React, {useEffect} from 'react';
import {RootState, useAppDispatch} from '../../redux/store';
import {useSelector} from 'react-redux';
import {bundlesInit, cityBundlesInit} from './bundlesSlice';
import {Bundle} from './type';
import BundleCard from './BundleCard';
import {useParams} from 'react-router-dom';

const BundlesList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {cityId} = useParams();

  const bundles = useSelector((store: RootState) => store.bundles.bundles);
  useEffect(() => {
    if (!cityId) {
      dispatch(bundlesInit());
    } else {
      dispatch(cityBundlesInit(+cityId));
    }
  }, []);
  return (
    <div className="container">
      <div className="bundles">
        {bundles.map((bundle: Bundle) => (
          <BundleCard bundle={bundle} key={bundle.id} />
        ))}
      </div>
    </div>
  );
};

export default BundlesList;
