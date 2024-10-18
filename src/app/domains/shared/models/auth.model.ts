export interface ResponseLogin {
  accessToken: string;
  refreshToken: string;
  user: {
    _id: string;
  };
}
