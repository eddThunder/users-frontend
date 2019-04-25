import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonConstants } from 'src/app/constants/constants';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }


  getAllUsers() {
    return this.http.get(environment.ApiBaseUrl + 'users/all');
  }

  getUserById(userId: number) {
    return this.http.get(environment.ApiBaseUrl + 'users/' + userId);
  }
}

