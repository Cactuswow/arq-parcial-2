import { baseEndpointUrl } from '@/constants'
import { isPlatformBrowser } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Injectable, PLATFORM_ID, inject } from '@angular/core'
import { Router } from '@angular/router'
import Swal from 'sweetalert2'
import type { User } from '../interfaces/login'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpClient = inject(HttpClient)
  private router = inject(Router)
  private platform = inject(PLATFORM_ID)
  private user: User = {} as User

  constructor() {
    if (isPlatformBrowser(this.platform)) {
      this.recoverUser()
    }
  }

  login(email: string, password: string) {
    const loginEndpoint = `${baseEndpointUrl}/auth`
    this.httpClient
      .post(loginEndpoint, {
        name: email,
        password
      })
      .subscribe({
        next: data => {
          this.user = data as User
          localStorage.setItem('user-token', this.user.accessToken)
          // alert(`Bienvenido ${this.user.username}`)
          Swal.fire({
            icon: 'success',
            title: 'Ingresado',
            text: `Bienvenid@ ${this.user.username}`
            // footer: '<a href="#">Why do I have this issue?</a>'
          })
          this.router.navigate(['home/get-products'])
        },
        error: () => {
          // alert('Usuario o credenciales no coinciden'),
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario o credenciales no coinciden!'
            // footer: '<a href="#">Why do I have this issue?</a>'
          })
        }
      })
  }

  recoverUser() {
    const token = localStorage.getItem('user-token')
    this.httpClient
      .get(`${baseEndpointUrl}/auth/me/${token}`)
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

  getToken() {
    if (isPlatformBrowser(this.platform)) {
      return localStorage.getItem('user-token')
    }

    return null
  }

  getUser() {
    return this.user
  }
}
