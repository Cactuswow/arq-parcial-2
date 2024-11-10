import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { LoginService } from './services/login.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder)
  private loginService = inject(LoginService)
  private router = inject(Router)

  private form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  formSubmit() {
    if (this.form.invalid) {
      return
    }

    const { email, password } = this.form.value
    const user = this.loginService.getUsers.find(
      user => user.email === email && user.id === password
    )

    if (user) {
      window.localStorage.setItem('user', JSON.stringify(user))
      this.router.navigate(['home/get-products'])
      return
    }

    alert('Usuario o credenciales incorrectos')
  }

  get getForm() {
    return this.form
  }

  get getEmail() {
    return this.getForm.get('email')
  }

  get getPassword() {
    return this.getForm.get('password')
  }
}
