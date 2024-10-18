import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {DialogModule} from '@angular/cdk/dialog';
import { CustomValidators } from '@shared/utils/validators';

import { ButtonComponent } from '@shared/components/button/button.component';
import { AlertsComponent } from '@shared/components/alerts/alerts.component';
import { AuthService } from '@shared/services/auth.service';
import { RequestStatus } from '@shared/models/request-status.model';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ButtonComponent, AlertsComponent, ReactiveFormsModule, DialogModule],
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent {

  formValidations = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });


  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [ CustomValidators.MatchValidator('password', 'confirmPassword') ]
  });

  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  message = signal('');
  errorMessage!: string;
  showRegister = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      this.authService.registerAndLogin(name, email, password).
        subscribe({
          next: () => {
            this.status = 'success';
            this.router.navigate(['/app']);
          },
          error: (error) => {
            this.status = 'failed';
            if (error.status === 400) {
              //mostrar alerta
              this.message.set('Email is already taken');
                  // Ocultar la alerta después de 5 segundos
              setTimeout(() => {
                this.status = 'init'; // Restablecer el estado
                this.message.set(''); // Limpiar el mensaje de error
              }, 4000);
            }
          }
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  validateUser() {
    if (this.formValidations.valid) {
      this.statusUser = 'loading';
      const { email } = this.formValidations.getRawValue();
      this.authService.isAvailable(email)
      .subscribe({
        next: (rta) => {
          this.statusUser = 'success';
          if (rta.isAvailable) {
            this.form.controls.email.setValue(email);
            this.showRegister = true;
          } else {
            this.router.navigate(['/login'], { queryParams: { email } });
          }
        },
        error: (err) => {
          this.statusUser = 'failed';
          this.errorMessage = err.message;
        }
      })
    } else {
      this.formValidations.markAllAsTouched()
    }
  }

}
