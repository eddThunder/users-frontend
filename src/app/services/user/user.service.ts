import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.put(environment.ApiBaseUrl + 'users/add', user);
  }

  deleteUser(userId: number) {
    return this.http.get(environment.ApiBaseUrl + 'users/delete/' + userId);
  }

  updateUser(user: User) {
    return this.http.post(environment.ApiBaseUrl + 'users/update', user);
  }

  getAllUsers() {
    return this.http.get(environment.ApiBaseUrl + 'users/all');
  }

  getUserById(userId: number) {
    return this.http.get(environment.ApiBaseUrl + 'users/' + userId);
  }
}

