import {User} from './type';

export type State = {
  users: User[];
  error: string | undefined;
};
