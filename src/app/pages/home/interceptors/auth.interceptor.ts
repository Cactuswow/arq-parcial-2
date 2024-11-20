import type { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Pase por el INTERCEPTOR");
  
  const token = localStorage.getItem("user-token");
  if(req.url.includes("/home")){ 
    if(token){
      const petitionClone = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(petitionClone).pipe(catchError(handleErrorResponse));
    }
  }

  return next(req).pipe(catchError(handleErrorResponse));
};

function handleErrorResponse(error: HttpErrorResponse) {
  // const errorResponse = ``
  console.log("My error", error)
  const router = inject(Router)

  return throwError(() => router.navigate(["home/**"]))
}