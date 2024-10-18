import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NavbarComponent } from '@shared/components/navbar/navbar.component'

import { Product } from '@shared/models/product.model';
import { TaskService } from '@shared/services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ScrollingModule, NavbarComponent],
  templateUrl: './task-list.component.html'
})
export default class TaskListComponent {
  private taskSrv = inject(TaskService);

  products = signal<Product[]>([])

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.taskSrv.getProducts()
    .subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (err: Error) => {
        console.error(err);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

}
