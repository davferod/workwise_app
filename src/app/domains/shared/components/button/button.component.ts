import { Component, computed, input, Input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { COLORS, Colors } from '@shared/models/colors.model';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  disabled = input<boolean>(false);
//  @Input() disabled = false;
  loading = input<boolean>(false);
  typeBtn = input<'reset' | 'submit' | 'button'>('button');
  private mapColors = COLORS();
  color = model<Colors>('primary');
// Computamos las clases basándonos en tu modelo COLORS
  colorClasses = computed(() => {
    return this.mapColors[this.color()] || this.mapColors['primary'];
  });

  faSpinner = faSpinner;

}
