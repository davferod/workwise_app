import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { MeService } from '../../services/me.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterModule, RouterOutlet],
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {
  private meService = inject(MeService);

  ngOnInit(): void {
    this.meService.getProfile()
  }
}
