import { baseEndpointUrl } from '@/constants'
import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Router } from '@angular/router'
import type { User } from '../interfaces/login'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpClient = inject(HttpClient)
  private router = inject(Router)
  private user: User = {} as User

  login(email: string, password: string) {
    const loginEndpoint = `${baseEndpointUrl}/user/login`
    this.httpClient
      .post(loginEndpoint, {
        username: email,
        password
      })
      .subscribe({
        next: data => {
          this.user = data as User
          localStorage.setItem(
            'user-token',
            JSON.stringify(this.user.accessToken)
          )
          alert(`Bienvenido ${this.user.username}`)
          this.router.navigate(['home/get-products'])
        },
        error: () => {
          alert('Usuario o credenciales no coinciden')
        }
      })
  }
}
