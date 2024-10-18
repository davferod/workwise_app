import { Injectable, signal } from '@angular/core';
import { Users } from '@shared/models/users.model';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class UsersStore {

  users = signal<Users[]>([]);
  originalData = signal<Users[]>([]);

/*   total = computed(() => {
    const productos = this.users();
    return productos.reduce((acc, product) => acc + product.price, 0);
  }); */

  constructor() { }

  setUsers(users: Users[]): void {
    this.users.set(users);
    this.originalData.set(users);
  }

/*   updateUsers(index: number): void {
    this.users.update((prevState) => {
      return prevState.map((prevUser) => {
        if (prevUser.id === index) {
          return { ...prevUser, price: 20};
        }
        return prevUser;
      });
    });
  } */

  findUser(query: string): void {
    const filteredUsers = this.originalData().filter((user) => {
      return user.name.toLowerCase().includes(query.toLowerCase())
        || user.email == query
    });
    this.users.set(filteredUsers);
  }
}
