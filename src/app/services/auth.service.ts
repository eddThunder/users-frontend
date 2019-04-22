import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.ApiUrl;
  constructor(private http: HttpClient) { }

  getUserAuthentication(username: string, password: string) {
    const url = this.baseUrl + 'token';
    const data = 'username=' + username + '&password=' + password + '&grant_type=password';
    const requestHeader = new HttpHeaders({'Content-type': 'application/x-www-urlencoded'});
    return this.http.put(url, data,  { headers: requestHeader} );
  }
}
