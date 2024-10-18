import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const errorResponseInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError(handleErrorResponse)
  )

function handleErrorResponse(err: HttpErrorResponse) {
  console.log('MyError', err);
  const errorResponse = `Error: ${err.status} - message: ${err.message}`;
  if (err.status === 401) {
    console.log('error 401');
  }
  return throwError(() => errorResponse);
}
