import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {authorization} from './authSlice';
import {useAppDispatch} from '../../redux/store';

function AuthorizationPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authUser = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    dispatch(authorization({email, password}));
    navigate('/');
  };

  return (
    <div className="registr-auth_container">
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
    </div>
  );
}

export default AuthorizationPage;
