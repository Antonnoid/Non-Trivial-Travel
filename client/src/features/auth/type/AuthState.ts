import {User} from '../../user/type';

export type AuthState = {
  user: User | undefined;
  error: string | undefined;
  pending: boolean;
};
