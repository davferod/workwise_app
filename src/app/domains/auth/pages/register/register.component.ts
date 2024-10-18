import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackgroundComponent } from '@auth/component/background/background.component';
import { HeaderComponent } from '@auth/component/header/header.component';
import { FooterComponent } from '@auth/component/footer/footer.component';
import { RegisterFormComponent } from '../../component/register-form/register-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, BackgroundComponent, HeaderComponent, FooterComponent, RegisterFormComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent  {

  constructor() { }

}
