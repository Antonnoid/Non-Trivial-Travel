import React, {useState} from 'react';
import './styles/styles.scss';
import {useNavigate} from 'react-router-dom';
import {registration} from './authSlice';
import {useAppDispatch} from '../../redux/store';

function RegisterPage(): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cityId, setCityId] = useState(0);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registerUser = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    dispatch(registration({name, email, password, cityId}));
    navigate('/');
  };

  return (
    <div className="registr-auth_container">
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
            onChange={(e) => setEmail(e.target.value)}
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
            placeholder="от 6 символов"
            type="text"
          />
        </label>
        <label className="registr-auth_label">
          Город
          <input
            value={cityId}
            onChange={(e) => setCityId(+e.target.value)}
            className="registr-auth_input"
            placeholder="ваш город"
            type="number"
          />
        </label>
        <div className="reg-auth-dutton">
          <button className="registr-auth_button" type="submit">
            ОК
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
