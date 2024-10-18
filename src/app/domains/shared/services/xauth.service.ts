import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo, gql } from 'apollo-angular';

import { catchError, switchMap, take, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { UsersStore } from '@app/domains/shared/stores/users-store';
import { ProfileStore } from '@app/domains/shared/stores/profile.store';
import { Profile } from '../models/profile.model';
import { TokenService } from './token.service';
import { MeService } from './me.service';
import { ResponseLogin } from '@shared/models/auth.model';
import { of } from 'rxjs';

import { checkToken } from '@interceptors/token.interceptor';
import { QUERY_PROFILE } from '@shared/operations/query';


@Injectable({
  providedIn: 'root'
})
export class XauthService {

  apiUrl = environment.API_URL;
  private usersStore = inject(UsersStore);
  private profileStore = inject(ProfileStore);
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private apollo = inject(Apollo);
  private meService = inject(MeService);

  registerAndLogin(name: string, email: string, password: string) {
    return this.register( name, email, password )
    .pipe(
      switchMap(() => this.login(email, password))
    );
  }

  login(email: string, password: string) {
    //console.log('servicio: ', email, password);
    return this.apollo.mutate<{ login: ResponseLogin }>({
      mutation: gql`
      mutation Login($loginInput: LoginInput!) {
        login(loginInput: $loginInput) {
          accessToken
          refreshToken
          user {
            _id
          }
        }
      }
      `,
      variables: {loginInput: { email, password}},
    }).pipe(
      tap(response => {
        if (response.errors) {
          console.error('GraphQL Errors: ', response.errors);
          throw new Error('Error al registrar usuario');
        }
        if (!response.data || !response.data.login) {
          throw new Error('Error al registrar usuario');
        }
        this.meService.getProfile();
        this.tokenService.saveToken(response.data.login.accessToken);
        this.tokenService.saveRefreshToken(response.data.login.refreshToken);
      })
    );
  }


  register(username: string, email: string, password: string) {
    return this.apollo.mutate<{ signup: ResponseLogin }>({
      mutation: gql`
        mutation Signup($loginUserInput: LoginUserInput!) {
          signup(loginInput: $loginInput) {
          accessToken
          refreshToken
          user {
            _id
          }
        }
      }
      `,
      variables: {loginInput: {username, email, password},
      },
    }).pipe(
      tap(response => {
        if (!response.data) {
          throw new Error('Error al registrar usuario');
        }
        this.meService.getProfile();
        this.tokenService.saveToken(response.data.signup.accessToken);
        this.tokenService.saveRefreshToken(response.data.signup.refreshToken);
      })
    );
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

  isAvailable(email: string) {
    return this.http.post<{isAvailable: boolean}>(`${this.apiUrl}/api/v1/auth/is-available`, { email })
  }

  logout() {
    this.tokenService.removeToken();
  }

}
