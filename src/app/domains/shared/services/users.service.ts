import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Users } from '@shared/models/users.model';
import { TokenService } from './token.service';
import { checkToken } from '@interceptors/token.interceptor';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = environment.API_URL;

  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  constructor() { }

  getUsers() {
    const token = this.tokenService.getToken()
    return this.http.get<Users[]>(`${this.apiUrl}/api/v1/users`, {
      //context: checkToken()
    });
  }
}
