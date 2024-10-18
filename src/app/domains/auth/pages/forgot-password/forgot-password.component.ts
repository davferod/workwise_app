import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackgroundComponent } from '@auth/component/background/background.component';
import { HeaderComponent } from '@auth/component/header/header.component';
import { FooterComponent } from '@auth/component/footer/footer.component';
import { ForgotPasswordFormComponent } from '../../component/forgot-password-form/forgot-password-form.component';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, BackgroundComponent, HeaderComponent, FooterComponent, ForgotPasswordFormComponent],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  constructor() {}
}
