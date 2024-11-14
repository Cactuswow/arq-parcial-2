import { baseEndpointUrl } from '@/constants'
import { HttpClient } from '@angular/common/http'
import { Injectable, afterNextRender, inject } from '@angular/core'
import { Router } from '@angular/router'
import type { User } from '../interfaces/login'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpClient = inject(HttpClient)
  private router = inject(Router)
  private user: User = {} as User

  constructor() {
    afterNextRender(() => {
      this.recoverUser()
    })
  }

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
          localStorage.setItem('user-token', this.user.accessToken)
          alert(`Bienvenido ${this.user.username}`)
          this.router.navigate(['home/get-products'])
        },
        error: () => {
          alert('Usuario o credenciales no coinciden')
        }
      })
  }

  recoverUser() {
    const token = localStorage.getItem('user-token')
    this.httpClient
      .get(`${baseEndpointUrl}/auth/me`, {
        headers: {
          // biome-ignore lint/style/useNamingConvention: <explanation>
          Authorization: `Bearer ${token}`
        }
      })
      .subscribe({
        next: data => {
          this.user = data as User
        },
        error: () => {
          localStorage.removeItem('user-token')
          this.router.navigate(['login'])
        }
      })
  }

  getUser() {
    return this.user
  }
}
