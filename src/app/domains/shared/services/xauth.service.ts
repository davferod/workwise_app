import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from '@environments/environment';
import { TokenService } from './token.service';
import { MeService } from './me.service';
import { ResponseLogin } from '@shared/models/auth.model';
import { checkToken } from '@interceptors/token.interceptor';
import { AuthStore } from '../stores/auth.store';


@Injectable({
  providedIn: 'root'
})
export class XauthService {

  apiUrl = environment.API_URL;
  private tokenService = inject(TokenService);
  private apollo = inject(Apollo);
  private meService = inject(MeService);
  private authStore = inject(AuthStore);

  registerAndLogin(name: string, email: string, password: string) {
    return this.register( name, email, password )
    .pipe(
      switchMap(() => this.login(email, password))
    );
  }

  revalidateToken() {
    return this.apollo.query<{ revalidate: ResponseLogin }>(
      {
        query: gql`
          query Revalidate {
            revalidate {
              accessToken
              refreshToken
              user {
                _id
                username
                email
                role
                isActive
              }
            }
          }
        `,
        fetchPolicy: 'no-cache',
        context: checkToken(),
      }
    ).pipe(
      tap((response) => {
        if (response.data?.revalidate) {
          this.tokenService.saveToken(response.data.revalidate.accessToken);
          this.authStore.setUser(response.data.revalidate.user);
        }
      }),
      map(({ data }) => data?.revalidate),
      catchError(() => of(null))
    );
  }

  login(email: string, password: string) {
    return this.apollo.mutate<{ login: ResponseLogin }>({
      mutation: gql`
      mutation Login($loginInput: LoginInput!) {
        login(loginInput: $loginInput) {
          accessToken
          refreshToken
          user {
            _id
            username
            email
            role
            isActive
          }
        }
      }
      `,
      variables: {loginInput: { email, password}},
    }).pipe(
      tap(response => {
        if (response.error) {
          console.error('GraphQL Errors: ', response.error);
          throw new Error('Error al registrar usuario');
        }
        if (!response.data || !response.data.login) {
          throw new Error('Error al registrar usuario');
        }
        this.meService.getProfile().subscribe();
        this.tokenService.saveToken(response.data.login.accessToken);
        this.tokenService.saveRefreshToken(response.data.login.refreshToken);
        this.authStore.setUser(response.data.login.user);
      })
    );
  }


  register(username: string, email: string, password: string) {
    return this.apollo.mutate<{ signup: ResponseLogin }>({
      mutation: gql`
        mutation Signup($loginUserInput: LoginUserInput!) {
          signup(loginUserInput: $loginUserInput) {
            accessToken
            refreshToken
            user {
              _id
              username
              email
              role
              isActive
            }
          }
        }
      `,
      variables: {
        loginUserInput: { username, email, password },
      },
    }).pipe(
      tap(response => {
        if (response.error) {
          console.error('GraphQL Errors: ', response.error);
          throw new Error('Error al registrar usuario');
        }
        if (!response.data || !response.data.signup) {
          throw new Error('Error al registrar usuario');
        }
        this.meService.getProfile().subscribe();
        this.tokenService.saveToken(response.data.signup.accessToken);
        this.tokenService.saveRefreshToken(response.data.signup.refreshToken);
        this.authStore.setUser(response.data.signup.user);
      })
    );
  }

  isAvailable(email: string) {
    return this.apollo.query<{ isValidate: boolean }>({
      query: gql`
        query IsValidate($email: String!) {
          isValidate(email: $email)
        }
      `,
      variables: { email },
      fetchPolicy: 'no-cache',
    }).pipe(
      map(({ data }) => ({ isAvailable: data?.isValidate }))
    );
  }

  logout() {
    this.tokenService.removeToken();
    this.authStore.clearUser();
  }

}
