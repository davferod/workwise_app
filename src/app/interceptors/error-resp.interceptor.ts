import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { TokenService } from "../domains/shared/services/token.service";
import { AuthStore } from "../domains/shared/stores/auth.store";

export const errorResponseInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError(handleErrorResponse)
  )

function handleErrorResponse(err: HttpErrorResponse) {
  console.log('MyError', err);
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const authStore = inject(AuthStore);

  if (err.status === 401) {
    console.log('error 401 - clearing auth and redirecting to login');
    authStore.clearUser();
    tokenService.removeToken();
    router.navigate(['/login']);
  }

  const errorResponse = `Error: ${err.status} - message: ${err.message}`;
  return throwError(() => errorResponse);
}
