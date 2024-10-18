import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faWarning } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts.component.html'
})
export class AlertsComponent {

  @Input() color: 'success' | 'info' | 'danger' | 'warning' | 'dark' = 'info';

  mapColors = {
    info: {
      'text-blue-800':true,
      'border-blue-300':true,
      'bg-blue-50':true,
      'dark:text-blue-400':true,
      'dark:border-blue-800':true,
    },
    danger: {
      'text-red-800':true,
      'border-red-300':true,
      'bg-red-50':true,
      'dark:text-red-400':true,
      'dark:border-red-800':true,
    },
    success: {
      'text-green-800':true,
      'border-green-300':true,
      'bg-green-50':true,
      'dark:text-green-400':true,
      'dark:border-green-800':true,
    },
    warning: {
      'text-yellow-800':true,
      'border-yellow-300':true,
      'bg-yellow-50':true,
      'dark:text-yellow-400':true,
      'dark:border-yellow-800':true,
    },
    dark: {
      'text-gray-800':true,
      'border-gray-300':true,
      'bg-gray-50':true,
      'dark:text-gray-400':true,
      'dark:border-gray-800':true,
    },
  };

  get colors() {
    const colors = this.mapColors[this.color];
    if (colors) {
      return colors;
    }
    return {};
  }
}
