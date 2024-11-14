// import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
// import { catchError, throwError } from 'rxjs';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const token = localStorage.getItem("token");
//   if(req.url.includes("/api")){  //para que no aplique interceptor al login
//     if(token){
//       const petitionClone = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       return next(petitionClone).pipe(catchError(handleError));
//     }
//   }

//   return next(req).pipe(catchError(handleError()));
// };

// function handleError = (error: HttpErrorResponse) => {
//   throw new Error('Function not implemented.');
// }

