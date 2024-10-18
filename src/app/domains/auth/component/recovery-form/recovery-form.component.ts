import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomValidators } from '@shared/utils/validators';
import { AuthService } from '@shared/services/auth.service';
import { RequestStatus } from '@shared/models/request-status.model';

@Component({
  selector: 'app-recovery-form',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './recovery-form.component.html'
})
export class RecoveryFormComponent {
  form = this.formBuilder.nonNullable.group(
    {
      newPassword: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('newPassword', 'confirmPassword'),
      ],
    }
  );
  status: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  errorMessage!: string;
  token!: '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) {
      this.route.queryParams.subscribe(params => {
        const token = params['token'];
        if(token) {
          this.token = token;
        }
        else {
          this.status = 'failed';
          this.router.navigate(['/login']);
        }
      });
    }

  recovery() {
    if (this.form.valid) {
      const { newPassword } = this.form.getRawValue();
      this.status = 'loading';
      this.authService.changePassword(this.token, newPassword)
        .subscribe({
          next: () => {
            this.status = 'success';
            this.router.navigate(['/login']);
          },
          error: (err) => {
            this.status = 'failed';
            this.form.setErrors({ invalid: true });
            this.errorMessage = err.message;
          },
        });
      this.status = 'loading';
      setTimeout(() => {
        this.status = 'success';
      }, 2000);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
