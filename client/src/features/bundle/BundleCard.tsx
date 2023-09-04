import React from 'react';
import {Link} from 'react-router-dom';
import {Bundle} from './type';

const BundleCard = ({bundle}: {bundle: Bundle}): JSX.Element => {
  return (
    <div>
      <div className="bundle">
        <div className="bundle__body">
          <h1 className="bundle__title">{bundle.title}</h1>
          <p className="bundle__description">{bundle.description}</p>
          <div className="bundle__links">
            <Link
              className="bundle__link bundle__link_more"
              to={`/bundles/${bundle.id}`}>
              Подробнее
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleCard;
