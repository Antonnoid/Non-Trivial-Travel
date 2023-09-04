import React, {useState} from 'react';
import {useAppDispatch} from '../../redux/store';
import {placeAddfromForm} from './placesSlice';

export default function FormAdd(): JSX.Element {
  const [message, setMessage] = useState('');

  const [description, setDesc] = useState('');
  const [city, setCity] = useState('');
  const [title, setTitle] = useState('');

  const dispatch = useAppDispatch();
  const addPlace = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (
      title.trim() !== '' &&
      description.trim() !== '' &&
      city.trim() !== ''
    ) {
      const result = await dispatch(
        placeAddfromForm({title, description, city})
      );
      if (placeAddfromForm.fulfilled.match(result)) {
        setMessage('Добавлено');
        setTimeout(() => {
          setMessage('');
        }, 2000);
      } else {
        setMessage('Ошибка добавления');
        setTimeout(() => {
          setMessage('');
        }, 2000);
      }
    } else {
      setMessage('Заполните все поля');
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
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
      <div className="message">{message}</div>
      <button type="submit">Добавить место</button>
    </form>
  );
}
