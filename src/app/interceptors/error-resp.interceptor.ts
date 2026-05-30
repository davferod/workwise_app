import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap, throwError } from "rxjs";
import { TokenService } from "../domains/shared/services/token.service";
import { AuthStore } from "../domains/shared/stores/auth.store";

export const errorResponseInterceptor: HttpInterceptorFn = (req, next) => {
  // inject() en el scope raíz del interceptor (dentro del injection context)
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const authStore = inject(AuthStore);

  const clearSession = () => {
    authStore.clearUser();
    tokenService.removeToken();
    tokenService.removeRefreshToken();
    router.navigate(['/login']);
  };

  return next(req).pipe(
    // Intercepta respuestas exitosas (200) con errores de negocio GraphQL
    tap(event => {
      if (event instanceof HttpResponse) {
        const body = event.body as { errors?: Array<{ message: string }> } | null;
        const isUnauthorized = body?.errors?.some(e => e.message === 'Unauthorized');
        if (isUnauthorized) {
          console.log('[errorResponseInterceptor] GraphQL Unauthorized en body — cerrando sesión');
          clearSession();
        }
      }
    }),
    // Intercepta errores HTTP reales (4xx, 5xx)
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        console.log('[errorResponseInterceptor] HTTP 401 — cerrando sesión');
        clearSession();
      }
      return throwError(() => `Error: ${err.status} - message: ${err.message}`);
    })
  );
};
