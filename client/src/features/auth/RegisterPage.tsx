import React, {useEffect, useState, useRef} from 'react';
import './styles/styles.scss';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {clearError, registration} from './authSlice';
import {RootState, useAppDispatch} from '../../redux/store';
import logoSlogon from './img/logoSlogon.png';
import DropList from '../droplist/DropList';
import {loadCitiesByLetter, loadCitiesPopular} from '../city/citiesSlice';

function RegisterPage(): JSX.Element {
  const {user, error} = useSelector((store: RootState) => store.auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [placeholder, setPlaceholder] = useState('Все города');
  const [input, setInput] = useState('');
  const [city, setCity] = useState('');
  const [disable, setDisabled] = useState(true);
  const [dropList, showDropList] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const registerUser = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    dispatch(registration({name, email, password, cityName: city}));
  };

  const ChengeEmail: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    setEmail(e.target.value);
    dispatch(clearError());
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const dropDownRef = useRef<HTMLUListElement | null>(null);
  const cities = useSelector((store: RootState) => store.cities.cities);
  const onClickCity = (e: any): void => {
    e.preventDefault();
    showDropList(false);
    setPlaceholder('');
    setCity(e.target.innerHTML);
    if (dropList) setDisabled(false);
  };

  return (
    <div className="registr-auth_container">
      {error && <span className="register-auth_span">{error}</span>}
      <form className="registr-auth_form" onSubmit={registerUser}>
        <label className="registr-auth_label">
          Имя
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="registr-auth_input"
            placeholder="Введите имя"
            type="text"
          />
        </label>
        <label className="registr-auth_label">
          Почта
          <input
            value={email}
            onChange={ChengeEmail}
            className="registr-auth_input"
            placeholder="ntt@mail.ru"
            type="text"
          />
        </label>
        <label className="registr-auth_label">
          Пароль
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="registr-auth_input"
            placeholder="от 3 символов"
            type="password"
          />
        </label>
        <label className="registr-auth_label registr-auth_label_city">
          Город
          <input
            value={city}
            onFocus={() => showDropList(true)}
            onChange={(e) => {
              setCity(e.target.value);
              setDisabled(true);
            }}
            className="registr-auth_input"
            placeholder="  Ваш город"
            type="text"
          />
          {dropList && (
            <DropList
              allCity={false}
              dropDownRef={dropDownRef}
              cities={cities}
              setPlaceholder={setPlaceholder}
              onClickCity={onClickCity}
            />
          )}
        </label>
        <div className="reg-auth-dutton">
          <button
            disabled={disable}
            className="registr-auth_button"
            type="submit"
          >
            ОК
          </button>
        </div>
      </form>
      <div className="registr-auth_container">
        <img src={logoSlogon} className="img_registr" alt="logoSlogon" />
      </div>
    </div>
  );
}

export default RegisterPage;
