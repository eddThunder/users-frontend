import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonConstants } from 'src/app/constants/constants';
import { RolesService } from '../roles/roles.service';
import { User } from 'src/app/models/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User;

  constructor(private http: HttpClient, private router: Router) { }

  getUserAuthentication(username: string, password: string) {
    const url = environment.ApiBaseUrl + 'token';
    const body = `grant_type=password&username=${username}&password=${password}`;
    // const requestHeader = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post(url, body);
  }

  getCurrentUser() {
    if (this.currentUser != null) {
      return this.currentUser;
    } else {
      this.getUserClaims().subscribe((data: User) => {
        this.currentUser = data;
        return this.currentUser;
      });
    }
  }

  getStoredAuthorizationToken(): string {
      return localStorage.getItem(CommonConstants.token.usersTokenConstant);
  }

  hasPermisionFor(allowedRoles: string[]): boolean {
    const userRoles: string[] = JSON.parse(localStorage.getItem(CommonConstants.user.userRolesKeyConstant));
    let coincidence = false;

    userRoles.forEach(userRole => {
      allowedRoles.forEach(allowedRole => {
        if (userRole === allowedRole) {
          coincidence = true;
          return false;
        }
      });
    });
    return coincidence;
  }

  logout() {
    localStorage.removeItem(CommonConstants.token.usersTokenConstant);
    this.currentUser = null;
    this.router.navigate(['login']);
  }

  private getUserClaims() {
    return this.http.get(environment.ApiBaseUrl + 'users/claims');
  }

}
