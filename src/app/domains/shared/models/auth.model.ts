export interface AuthUser {
  _id: string;
  username: string;
  email: string;
  role: string[];
  isActive: boolean;
}

export interface ResponseLogin {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}
