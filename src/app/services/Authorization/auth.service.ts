import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.ApiUrl;
  // currentUser: User;

  constructor(private http: HttpClient) { }

  getUserAuthentication(username: string, password: string) {
    const url = this.baseUrl + 'token';
    const body = `grant_type=password&username=${username}&password=${password}`;
    const requestHeader = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post(url, body,  { headers: requestHeader} );
  }
}
