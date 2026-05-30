import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

import { switchMap, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { TokenService } from './token.service';
import { MeService } from './me.service';
import { ResponseLogin } from '@shared/models/auth.model';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class XauthService {

  apiUrl = environment.API_URL;
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
        if (response.error) {
          console.error('GraphQL Errors: ', response.error);
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
          signup(loginUserInput: $loginUserInput) {
            accessToken
            refreshToken
            user {
              _id
            }
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
        this.meService.getProfile();
        this.tokenService.saveToken(response.data.signup.accessToken);
        this.tokenService.saveRefreshToken(response.data.signup.refreshToken);
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
  }

}
