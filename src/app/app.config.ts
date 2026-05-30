import { ApplicationConfig, inject, provideZonelessChangeDetection, provideAppInitializer} from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { routes } from './app.routes';
import { graphqlProvider } from './graphql.provider';
import { tokenInterceptor } from '@interceptors/token.interceptor';
import { errorResponseInterceptor } from './interceptors/error-resp.interceptor';
import { DatePipe } from '@angular/common';
import { XauthService } from './domains/shared/services/xauth.service';
import { TokenService } from './domains/shared/services/token.service';
import { AuthStore } from './domains/shared/stores/auth.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding(), withPreloading(PreloadAllModules), withViewTransitions()),
    provideHttpClient(
      withFetch(),
      withInterceptors([tokenInterceptor, errorResponseInterceptor])
    ),
    provideZonelessChangeDetection(),
    graphqlProvider,
    DatePipe,
    provideAppInitializer(() => {
      const xauthService = inject(XauthService);
      const tokenService = inject(TokenService);
      const authStore = inject(AuthStore);

      const token = tokenService.getToken();
      if (token && tokenService.isValidToken()) {
        return firstValueFrom(
          xauthService.revalidateToken().pipe(
            tap((response) => {
              if (response) {
                authStore.setUser(response.user);
              }
            }),
            catchError(() => {
              authStore.clearUser();
              return of(null);
            })
          )
        );
      }
      return Promise.resolve(null);
    })
  ]
};
