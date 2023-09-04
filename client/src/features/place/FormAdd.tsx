import React, {useState} from 'react';
import {useAppDispatch} from '../../redux/store';
import {placeAddfromForm} from './placesSlice';

export default function FormAdd(): JSX.Element {
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [city, setCity] = useState('');
  const dispatch = useAppDispatch();
  const addPlace = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    dispatch(placeAddfromForm({title, description, city}));
  };
  return (
    <form onSubmit={addPlace}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        name="title"
        type="text"
        placeholder="Название"
      />
      <input
        value={description}
        onChange={(e) => setDesc(e.target.value)}
        name="description"
        type="text"
        placeholder="Описание"
      />
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        name="city"
        type="text"
        placeholder="Город"
      />
      <div className="message"></div>
      <button type="submit">Добавить место</button>
    </form>
  );
}
