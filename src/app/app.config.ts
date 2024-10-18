import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { graphqlProvider } from './graphql.provider';
import { tokenInterceptor } from '@interceptors/token.interceptor';
import { errorResponseInterceptor } from './interceptors/error-resp.interceptor';
import { DatePipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding(), withPreloading(PreloadAllModules), withViewTransitions()),
    provideHttpClient(
      withFetch(),
      withInterceptors([tokenInterceptor, errorResponseInterceptor])
    ),
    graphqlProvider,
    DatePipe
  ]
};
