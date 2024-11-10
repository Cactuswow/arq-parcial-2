import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
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

  private form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  formSubmit() {
    if (this.form.invalid) {
      return
    }

    const { username, password } = this.form.value
    this.loginService.login(username as string, password as string)
  }

  get getForm() {
    return this.form
  }

  get getUsername() {
    return this.getForm.get('username')
  }

  get getPassword() {
    return this.getForm.get('password')
  }
}
