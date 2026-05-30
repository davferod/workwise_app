import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomValidators } from '@shared/utils/validators';
import { XauthService } from '@shared/services/xauth.service';
import { RequestStatus } from '@shared/models/request-status.model';

@Component({
  selector: 'app-recovery-form',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './recovery-form.component.html'
})
export class RecoveryFormComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(XauthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
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
      this.status = 'loading';
      const { newPassword } = this.form.getRawValue();
      
      // Simulated password reset (no actual backend call)
      setTimeout(() => {
        console.log(`[Recovery UI] Password would be reset with token: ${this.token}`);
        this.status = 'success';
        // Redirect to login after brief success message
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      }, 800);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
