import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackgroundComponent } from '@auth/component/background/background.component';
import { HeaderComponent } from '@auth/component/header/header.component';
import { FooterComponent } from '@auth/component/footer/footer.component';
import { LoginFormComponent } from '@auth/component/login-form/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, BackgroundComponent, HeaderComponent, FooterComponent, LoginFormComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
