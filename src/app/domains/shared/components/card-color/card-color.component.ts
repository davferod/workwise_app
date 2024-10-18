import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { COLORS, Colors } from '@shared/models/colors.model';

@Component({
  selector: 'app-card-color',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './card-color.component.html'
})
export class CardColorComponent {
  @Input() loading = false;
  @Input() color: Colors = 'blue';
  faSpinner = faSpinner;

  mapColors = COLORS;

  get colors() {
    const clases = this.mapColors[this.color];
    return clases ? clases : {};
  }
}
