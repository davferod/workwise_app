import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { XauthService } from '@shared/services/xauth.service';


import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-form',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './forgot-password-form.component.html'
})
export class ForgotPasswordFormComponent {

  private formBuilder = inject(FormBuilder);
  private authService = inject(XauthService);
  private router = inject(Router);
  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });
  status: string = 'init';
  emailSent = false;
  errorMessage!: string;

  constructor() { }

  sendLink() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email } = this.form.getRawValue();
      
      // Simulated email sending (no actual backend call)
      setTimeout(() => {
        this.emailSent = true;
        this.status = 'success';
        console.log(`[Forgot Password UI] Recovery link would be sent to: ${email}`);
      }, 800);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
