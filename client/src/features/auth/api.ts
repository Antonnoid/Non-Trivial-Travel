/* eslint-disable import/prefer-default-export */
import {User, UserAuthLog, UserAuthReg} from '../user/type';

// фетч в базу на авторизацию !!!
export const fetchAuthUser = async (user: UserAuthLog): Promise<User> => {
  const res = await fetch('/api/auth/authorization', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(user),
  });
  console.log(res, '---летит феч в базу на авториз-----');
  return res.json();
};

// фетч в базу на регистрацию !!!
export const fetchRegisterUser = async (user: UserAuthReg): Promise<User> => {
  const res = await fetch('/api/auth/registration', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(user),
  });
  console.log(res, '---летит феч в базу на регу-----');
  return res.json();
};

// фетч на проверку наличия юзера !!!
export const fetchAuthCheckUser = async (): Promise<User> => {
  const res = await fetch('/api/auth/check');
  console.log(res, '---летит феч в базу на проверку наличия юзера-----');
  return res.json();
};

// фетч на выход юзера !!!
export const fetchLogOut = async (): Promise<{message: string}> => {
  const res = await fetch('/api/auth/logout');
  console.log(res, '---летит феч в базу на выход юзера-----');
  return res.json();
};
