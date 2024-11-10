import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import type { RawUser, User } from '../interfaces/login'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private users: User[] = []
  private httpClient = inject(HttpClient)
  private userEndpoint = 'https://reqres.in/api/users'

  constructor() {
    this.httpClient.get(this.userEndpoint).subscribe(response => {
      const { data } = response as { data: RawUser[] }
      this.users = this.mapJsonToUser(data)
    })
  }

  get getUsers() {
    return [...this.users]
  }

  mapJsonToUser(data: RawUser[]): User[] {
    return data.map(user => ({
      id: String(user.id),
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      avatar: user.avatar
    }))
  }
}
