import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { TokenService } from './token.service';
import { ResponseLogin } from '@shared/models/auth.model';
import { Users } from '@shared/models/users.model';
import { BehaviorSubject } from 'rxjs';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.API_URL;
  user$ = new BehaviorSubject<Users | null>(null);

  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  login(email: string, password: string) {
    return this.http.post<ResponseLogin>(`${this.apiUrl}/api/v1/auth/login`, { email, password })
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.accessToken);
        this.tokenService.saveRefreshToken(response.refreshToken);
      })
    );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/register`, { name, email, password })
  }

  refreshToken(refreshToken: string) {
    return this.http.post<ResponseLogin>(`${this.apiUrl}/api/v1/auth/refresh-token`, { refreshToken })
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.accessToken);
        this.tokenService.saveRefreshToken(response.refreshToken);
      })
    );
  }

  registerAndLogin(name: string, email: string, password: string) {
    return this.register( name, email, password )
    .pipe(
      switchMap(() => this.login(email, password))
    );
  }

  isAvailable(email: string) {
    return this.http.post<{isAvailable: boolean}>(`${this.apiUrl}/api/v1/auth/is-available`, { email })
  }

  recovery(email: string) {
    return this.http.post<{recoveryToken: string}>(`${this.apiUrl}/api/v1/auth/recovery`, { email })
  }

  changePassword(token: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/change-password`, { token, newPassword })
  }

  getProfile() {
    const token = this.tokenService.getToken();
    return this.http.get<Users>(`${this.apiUrl}/api/v1/auth/profile`, {
      context: checkToken()
    })
    .pipe(
      tap((user) => this.user$.next(user))
    );
  }

  logout() {
    this.tokenService.removeToken();
  }
}
