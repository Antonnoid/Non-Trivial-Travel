import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Bundle} from './type';
import {RootState} from '../../redux/store';

const BundleCard = ({bundle}: {bundle: Bundle}): JSX.Element => {
  const bundlePlacesId = bundle?.Bundle_places?.map((el) => el.placeId);

  const images = useSelector((store: RootState) => store.images.images);
  const ourImages = images.filter((image) =>
    bundlePlacesId?.find((id) => image.placeId === id)
  );

  const randomImage =
    ourImages[Math.floor(Math.random() * (ourImages.length - 1))];

  return (
    <div>
      <div className="bundle">
        <img className="bundle__front-img" src={randomImage?.url} alt="img" />
        <div className="bundle__front">
          <div className="bundle__front-elements">
            <h1 className="bundle__front-title">{bundle.title}</h1>
            {/* <p className="bundle__description">{bundle.description}</p> */}
            <div className="bundle__front-links">
              <Link
                className="bundle__front-link bundle__front-link_more"
                to={`/bundles/${bundle.id}`}
              >
                Подробнее
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleCard;
