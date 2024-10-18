import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackgroundComponent } from '@auth/component/background/background.component';
import { HeaderComponent } from '@auth/component/header/header.component';
import { FooterComponent } from '@auth/component/footer/footer.component';
import { RecoveryFormComponent } from '../../component/recovery-form/recovery-form.component';

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [CommonModule, RouterModule, BackgroundComponent, HeaderComponent, FooterComponent, RecoveryFormComponent],
  templateUrl: './recovery.component.html',
})
export class RecoveryComponent {
  constructor() {}
}
