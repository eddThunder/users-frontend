import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonConstants } from 'src/app/constants/constants';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.ApiUrl;
  // currentUser: User;

  constructor(private http: HttpClient, private router: Router) { }

  getUserAuthentication(username: string, password: string) {
    const url = this.baseUrl + 'token';
    const body = `grant_type=password&username=${username}&password=${password}`;
    const requestHeader = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post(url, body,  { headers: requestHeader} );
  }

  getUserClaims() {
    const reqHeaders = new HttpHeaders({Authorization : 'Bearer ' + localStorage.getItem(CommonConstants.token.usersTokenConstant)});
    return this.http.get(this.baseUrl + 'users/claims', {headers: reqHeaders});
  }

  getStoredAuthorizationToken(): string {
      return localStorage.getItem('userAccessToken');
  }

  logout() {
    localStorage.removeItem('userAccessToken');
    this.router.navigate(['login']);
  }
}
