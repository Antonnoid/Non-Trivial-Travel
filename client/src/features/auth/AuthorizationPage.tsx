import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../redux/store';
import {fetchAuthUser} from './api';

function AuthorizationPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authUser = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const data = await fetchAuthUser({email, password});
    dispatch({type: 'users/auth', payload: data});
    navigate('/');
  };

  return (
    <div className="registr-auth_container">
      <h2 className="registr-auth_header">Форма авторизации</h2>
      <form className="registr-auth_form" onSubmit={authUser}>
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
      </form>
      <button className="registr-auth__button" type="submit">
        ОК
      </button>
    </div>
  );
}

export default AuthorizationPage;
