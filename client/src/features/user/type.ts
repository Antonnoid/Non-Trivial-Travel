import {City} from '../city/types/types';

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
  cityId?: number;
  cityName?: string;
};

export type UserAuthLog = {
  email: string;
  password: string;
};
