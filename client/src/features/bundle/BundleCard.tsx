import React from 'react';
import {Link} from 'react-router-dom';
import {Bundle} from './type';

const BundleCard = ({bundle}: {bundle: Bundle}): JSX.Element => {
  return (
    <div className="bundle">
      <img className="bundle__front-img" src="/" alt="img" />
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
  );
};

export default BundleCard;
