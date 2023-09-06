import {City} from './types';

export type State = {
  cities: City[];
  allCities: City[];

  error: undefined | string;
};
