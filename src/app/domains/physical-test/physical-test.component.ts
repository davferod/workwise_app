import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-physical-test',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './physical-test.component.html'
})
export class PhysicalTestComponent {

}
