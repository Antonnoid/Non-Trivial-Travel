import {User, UserAuth} from './type';

export type State = {
  users: User[];
  userAuth: UserAuth | undefined;
  error: string | undefined;
};
