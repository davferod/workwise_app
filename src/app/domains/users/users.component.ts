import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkTableModule} from '@angular/cdk/table';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

import { UsersService } from '@shared/services/users.service';
import { UsersStore } from '@app/domains/shared/stores/users-store';
import { AuthService } from '@shared/services/auth.service';
import { Users } from '@shared/models/users.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, CdkTableModule, ReactiveFormsModule],
  templateUrl: './users.component.html'
})
export class UsersComponent {
  private usersService = inject(UsersService);
  private usersStore = inject(UsersStore);
  private authService = inject(AuthService);
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  input = new FormControl('', { nonNullable: true });

  users =  this.usersStore.users;
  originalData = this.usersStore.originalData;
  user: Users | null = null;


  ngOnInit(): void {
    this.getUsers();

    this.input.valueChanges
    .pipe(debounceTime(300))
    .subscribe((value) => {
      this.findProduct(value);
    });
    this.authService.user$
    .subscribe((data) => {
      this.user = data;
    });
  }

  getUsers() {
    this.usersService.getUsers()
    .subscribe({
      next: (data) => {
        this.usersStore.setUsers(data);
      },
      error: (err: Error) => {
        console.error(err);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  findProduct(query: string): void {
    this.usersStore.findUser(query);
  }
}

