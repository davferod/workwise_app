import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';

import { ButtonComponent } from '@shared/components/button/button.component';
import { XauthService } from '@shared/services/xauth.service';
import { RequestStatus } from '@shared/models/request-status.model';


@Component({
  selector: 'app-loginForm',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ButtonComponent
  ],
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {

  private formBuilder = inject(FormBuilder);
  private xauthService = inject(XauthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
  });

  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: RequestStatus = 'init';

  constructor() {
    this.route.queryParamMap.subscribe(params => {
      const email = params.get('email');
      if(email) {
        this.form.controls.email.setValue(email)
      }
    })
  }

  doLogin() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();
      //console.log('login: ', email, password);
      this.xauthService.login(email, password)
      .subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/app']);

        },
        error: (error) => {
          console.error('Login failed:', error);
          this.status = 'failed';
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
}
