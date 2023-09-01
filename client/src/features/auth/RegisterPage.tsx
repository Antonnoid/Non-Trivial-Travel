import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../redux/store';
import {fetchRegisterUser} from './api';

function RegisterPage(): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registerUser = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const data = await fetchRegisterUser({
      name,
      email,
      password,
      city,
    });
    dispatch({type: 'users/register', payload: data});
    navigate('/');
  };

  return (
    <div className="registr-auth_container">
      <h2 className="registr-auth_header">Форма регистрации</h2>
      <form className="registr-auth_form" onSubmit={registerUser}>
        <label className="registr-auth_label">Имя</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="registr-auth__input"
          placeholder="Введите имя"
          type="text"
        />
        <label className="registr-auth_label">Почта</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="registr-auth__input"
          placeholder="ntt@mail.ru"
          type="text"
        />
        <label className="registr-auth_label">Пароль</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="registr-auth__input"
          placeholder="от 6 символов"
          type="text"
        />
        <label className="registr-auth_label">Город</label>
        <input
          value={password}
          onChange={(e) => setCity(e.target.value)}
          className="registr-auth__input"
          placeholder="ваш город"
          type="text"
        />
      </form>
      <button className="registr-auth__button" type="submit">
        ОК
      </button>
    </div>
  );
}

export default RegisterPage;
