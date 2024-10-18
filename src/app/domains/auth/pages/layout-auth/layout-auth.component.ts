import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackgroundComponent } from '@auth/component/background/background.component';
import { HeaderComponent } from '@auth/component/header/header.component';
import { FooterComponent } from '@auth/component/footer/footer.component';

@Component({
  selector: 'app-layout-auth',
  standalone: true,
  imports: [CommonModule, RouterModule, BackgroundComponent, HeaderComponent, FooterComponent],
  templateUrl: './layout-auth.component.html'
})
export class LayoutAuthComponent {

}
