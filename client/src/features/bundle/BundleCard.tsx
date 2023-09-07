import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Rate} from 'antd';
import {Bundle} from './type';
import {RootState, useAppDispatch} from '../../redux/store';
import {bundleRemove} from './bundlesSlice';

const BundleCard = ({bundle}: {bundle: Bundle}): JSX.Element => {
  const bundlePlacesId = bundle?.Bundle_places?.map((el) => el.placeId);
  const dispatch = useAppDispatch();
  const images = useSelector((store: RootState) => store.images.images);
  const rating = useSelector((store: RootState) => store.ratings.ratings);
  const ourImages = images.filter((image) =>
    bundlePlacesId?.find((id) => image.placeId === id)
  );

  const ourRating = rating.filter(
    (el) => el.itemId === bundle.id && el.type === 'bundle'
  );
  const averageRating =
    ourRating.reduce((acc, el) => el.rate + acc, 0) / ourRating.length;

  const randomImage =
    ourImages[Math.floor(Math.random() * (ourImages.length - 1))];
  const removeBundle = async (): Promise<void> => {
    dispatch(bundleRemove(bundle.id));
  };

  return (
    <div>
      <div className="bundle">
        <img className="bundle__front-img" src={randomImage?.url} alt="img" />
        <div className="bundle__front">
          <div className="bundle__front-elements">
            <h1 className="bundle__front-title">{bundle.title}</h1>
            <Rate disabled defaultValue={averageRating} />
            {/* <p className="bundle__description">{bundle.description}</p> */}
            <div className="bundle__front-links">
              <Link
                className="bundle__front-link bundle__front-link_more"
                to={`/bundles/${bundle.id}`}
              >
                Подробнее
              </Link>
              <button
                onClick={removeBundle}
                type="button"
                className="bundle__front-link bundle__front-link_more"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleCard;
