import React from 'react';
import Errorimg from './img/photo.png';
import './styles/styles.scss';

function Error(): JSX.Element {
  return (
    <div className="error-container">
      <h3 className="error-text">Такой страницы не существует</h3>
      <img className="error-img" src={Errorimg} alt="error" />;
    </div>
  );
}

export default Error;
