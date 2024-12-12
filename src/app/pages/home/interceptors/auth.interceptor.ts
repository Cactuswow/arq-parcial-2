import type { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { catchError, throwError } from 'rxjs'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes('/api')) {
    return next(req)
  }

  const token = localStorage.getItem('user-token')
  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  ).pipe(catchError(handleErrorResponse))
}

function handleErrorResponse(_error: HttpErrorResponse) {
  const router = inject(Router)
  return throwError(() => router.navigate(['home/**']))
}
