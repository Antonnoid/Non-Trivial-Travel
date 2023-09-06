import {City} from './types';

export type Action =
  | {type: 'cities/load'; payload: City[]}
  | {type: 'cities/load/popular'; payload: City[]};
