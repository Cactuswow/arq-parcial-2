import { LoginService } from '@/pages/login/services/login.service'
import { inject } from '@angular/core'
import { type CanActivateFn, Router } from '@angular/router'

export const protectionGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router)
  const loginService = inject(LoginService)
  if (loginService.getToken()) {
    return true
  }

  return router.createUrlTree(['login'])
}
