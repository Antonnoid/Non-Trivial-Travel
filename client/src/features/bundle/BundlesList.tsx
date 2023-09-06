import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';
import {bundlesInit, cityBundlesInit} from './bundlesSlice';
import {Bundle} from './type';
import BundleCard from './BundleCard';

const BundlesList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {cityId} = useParams();

  const bundles = useSelector((store: RootState) => store.bundles.bundles);
  useEffect(() => {
    if (!cityId) {
      dispatch(bundlesInit());
      return;
    }
    if (cityId) {
      dispatch(cityBundlesInit(+cityId));
    }
  }, []);

  const cityBundles = bundles.filter((bundle) =>
    cityId ? bundle.cityId === +cityId : bundle
  );

  return (
    <div className="container">
      <div className="bundleslist">
        <div className="bundles_text-title">
          <h3>Подборки</h3>
        </div>
        <div className="bundles">
          {!cityId
            ? bundles &&
              bundles.length > 0 &&
              bundles.map((bundle: Bundle) => (
                <BundleCard bundle={bundle} key={bundle.id} />
              ))
            : cityBundles.map((bundle) => (
                <BundleCard bundle={bundle} key={bundle.id} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default BundlesList;
