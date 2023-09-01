export type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
  city: string;
  isAdmin: boolean;
};

export type UserAuth = {
  email: string;
  password: string;
};

export type UserRegister = {
  name: string;
  email: string;
  password: string;
  city: string;
};
