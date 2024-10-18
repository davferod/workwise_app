export interface Users {
  _id: string;
  name: string;
  email: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface UsersArray extends Array<User> {}
