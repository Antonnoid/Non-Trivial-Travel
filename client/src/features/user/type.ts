import {City} from '../navbar/types/types';

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  cityId: number;
  isAdmin: boolean;
  City?: City;
};

export type UserAuthReg = {
  name: string;
  email: string;
  password: string;
  cityId: number;
};

export type UserAuthLog = {
  email: string;
  password: string;
};
