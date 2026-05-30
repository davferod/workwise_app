import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { jwtDecode,JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string) {
    setCookie('token-trello', token, { expires: 1, path: '/'  });
  }

  getToken() {
    const token = getCookie('token-trello');
    return token;
  }

  removeToken() {
    removeCookie('token-trello');
  }

  saveRefreshToken(token: string) {
    setCookie('refresh_token-trello', token, { expires: 1, path: '/'  });
  }

  getRefreshToken() {
    const token = getCookie('refresh_token-trello');
    return token;
  }

  removeRefreshToken() {
    removeCookie('refresh_token-trello');
  }

  isValidToken(): boolean {
    try {
      const token = this.getToken();
      console.log('token', token);
      if (!token) {
        return false;
      }
      const decodeToken = jwtDecode<JwtPayload>(token);
      if (decodeToken && decodeToken?.exp) {
        const tokenDate = new Date(0);
        tokenDate.setUTCSeconds(decodeToken.exp);
        return tokenDate > new Date();
      }
      return false;
    } catch {
      console.warn('[TokenService] Token decodification failed — treating as invalid');
      return false;
    }
  }

  isValidRefreshToken(): boolean {
    try {
      const token = this.getRefreshToken();
      if (!token) {
        return false;
      }
      const decodeToken = jwtDecode<JwtPayload>(token);
      if (decodeToken && decodeToken?.exp) {
        const tokenDate = new Date(0);
        tokenDate.setUTCSeconds(decodeToken.exp);
        return tokenDate > new Date();
      }
      return false;
    } catch {
      console.warn('[TokenService] Refresh token decodification failed — treating as invalid');
      return false;
    }
  }
}
