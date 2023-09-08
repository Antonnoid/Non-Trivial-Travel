/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, {useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {RootState, useAppDispatch} from '../../redux/store';
import {placeAddfromForm} from './placesSlice';
import DropList from '../droplist/DropList';
import {loadCitiesByLetter, loadCitiesPopular} from '../city/citiesSlice';
import './styles/styleAddPage.scss';

export default function FormAdd(): JSX.Element {
  const [message, setMessage] = useState('');

  const [description, setDesc] = useState('');
  const [city, setCity] = useState('');
  const [title, setTitle] = useState('');
  const [allCity, setAllCity] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const titleInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLInputElement>(null);
  const cityInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  // const addPlace = async (
  //   e: React.FormEvent<HTMLFormElement>
  // ): Promise<void> => {
  //   e.preventDefault();
  //   if (
  //     title.trim() !== '' &&
  //     description.trim() !== '' &&
  //     city.trim() !== ''
  //   ) {
  //     const result = await dispatch(
  //       placeAddfromForm({title, description, city})
  //     );
  //     if (placeAddfromForm.fulfilled.match(result)) {
  //       setMessage('Добавлено');
  //       setTimeout(() => {
  //         setMessage('');
  //       }, 2000);
  //     } else {
  //       setMessage('Ошибка добавления');
  //       setTimeout(() => {
  //         setMessage('');
  //       }, 2000);
  //     }
  //   } else {
  //     setMessage('Заполните все поля');
  //     setTimeout(() => {
  //       setMessage('');
  //     }, 2000);
  //   }
  // };
  const dropDownRef = useRef<HTMLUListElement | null>(null);
  const cities = useSelector((store: RootState) => store.cities.cities);
  const [placeholder, setPlaceholder] = useState('Все города');
  const [dropList, showDropList] = useState(false);
  const [disable, setDisabled] = useState(true);

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    if (
      fileInput.current?.files?.length &&
      titleInput.current?.value &&
      descriptionInput.current?.value &&
      cityInput.current?.value
    ) {
      const file = fileInput.current.files;
      const title = titleInput.current.value;
      const description = descriptionInput.current.value;
      const city = cityInput.current.value;

      const formData = new FormData();

      for (const key in file) {
        formData.append(`img${key}`, file[key]);
      }

      // formData.append('file', file);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('city', city);

      // dispatch(addPresentation(formData));
      dispatch(placeAddfromForm(formData));
    }
    navigate(-1);
  };

  const initCities = async (): Promise<void> => {
    if (city) {
      dispatch(loadCitiesByLetter(city.toLowerCase()));
      return;
    }
    if (!city) {
      dispatch(loadCitiesPopular());
    }
  };
  useEffect(() => {
    initCities();
  }, [city]);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        dropList &&
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        showDropList(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropList]);
  const onClickCity = (e: any): void => {
    e.preventDefault();
    showDropList(false);
    setPlaceholder('');
    setCity(e.target.innerHTML);
    if (dropList) setDisabled(false);
  };

  return (
    <div className="placeAddForm_page-container">
      <div className="routeAddForm_text-title">
        <h1>Добавление места</h1>
      </div>
      <form className="routeAddForm_form" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e): void => setTitle(e.target.value)}
          name="title"
          type="text"
          placeholder="Название"
          ref={titleInput}
        />
        <input
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          name="description"
          type="text"
          placeholder="Описание"
          ref={descriptionInput}
        />
        <div className="city">
          <input
            onFocus={() => showDropList(true)}
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setDisabled(true);
            }}
            name="city"
            type="text"
            placeholder="Город"
            autoComplete="off"
            ref={cityInput}
          />
          <input type="file" ref={fileInput} multiple />
          {dropList && (
            <DropList
              allCity={allCity}
              dropDownRef={dropDownRef}
              cities={cities}
              setPlaceholder={setPlaceholder}
              onClickCity={onClickCity}
            />
          )}
        </div>
        <div className="message">{message}</div>
        <button
          className="routeAddForm_droplist-button placeAddForm-button"
          type="submit"
        >
          Добавить место
        </button>
      </form>
    </div>
  );
}
