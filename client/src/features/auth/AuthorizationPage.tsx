import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {authorization} from './authSlice';
import {RootState, useAppDispatch} from '../../redux/store';
import logoSlogon from './img/logoSlogon.png';

function AuthorizationPage(): JSX.Element {
  const {error, user} = useSelector((store: RootState) => store.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authUser = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    dispatch(authorization({email, password}));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  return (
    <div className="registr-auth_container">
      {error && <span style={{fontSize: '25px', color: 'red'}}>{error}</span>}
      <form className="registr-auth_form" onSubmit={authUser}>
        <label className="registr-auth_label">Почта</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="registr-auth_input"
          placeholder="ntt@mail.ru"
          type="text"
        />
        <label className="registr-auth_label">Пароль</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="registr-auth_input"
          placeholder="от 3 символов"
          type="text"
        />
        <div className="reg-auth-dutton">
          <button className="registr-auth_button" type="submit">
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

export default AuthorizationPage;
