import type { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError(handleErrorResponse));
};

function handleErrorResponse (error: HttpErrorResponse){
  // const errorResponse = ``
  console.log("My error", error)

  return throwError(()=> "Opa")
}