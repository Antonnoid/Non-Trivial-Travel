/* eslint-disable import/prefer-default-export */
import {User, UserAuth, UserRegister} from '../user/type';

// фетч в базу на авторизацию
export const fetchAuthUser = async (user: UserAuth): Promise<User> => {
  const res = await fetch('/api/auth/authorization', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(user),
  });
  return res.json();
};

// фетч в базу на регистрацию
export const fetchRegisterUser = async (user: UserRegister): Promise<User> => {
  const res = await fetch('/api/auth/registration', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }
  return res.json();
};

// фетч на выход юзера
export const fetchLogOut = async (): Promise<void> => {
  fetch('/api/auth/logout');
};
