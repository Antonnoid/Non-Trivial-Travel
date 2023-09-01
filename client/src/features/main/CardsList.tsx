import React from 'react';
import CardItem from './CardItem';

export default function CardsList(): JSX.Element {
  return (
    <div className="container">
      <div className="cards">
        <div className="cards__body">
          <h1 className="cards__header">Маршруты</h1>
          <div className="cards__list">
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
          </div>
        </div>
      </div>
    </div>
  );
}
