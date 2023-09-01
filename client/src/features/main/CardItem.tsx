import React from 'react';

export default function CardItem(): JSX.Element {
  return (
    <a href="/" className="card">
      <h3 className="card__header">Заголовок</h3>
      <div className="card__rating rating">
        <span className="ratin__star">+</span>
        <span className="ratin__star">+</span>
        <span className="ratin__star">+</span>
        <span className="ratin__star">+</span>
        <span className="ratin__star">+</span>
      </div>
      <p className="card__time">6 ч.</p>
    </a>
  );
}
