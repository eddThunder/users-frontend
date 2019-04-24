import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonConstants } from 'src/app/constants/constants';
import { RolesService } from '../roles/roles.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  availableRoles: any;

  constructor(private http: HttpClient, private router: Router, private roleService: RolesService) { }

  getUserAuthentication(username: string, password: string) {
    const url = environment.ApiBaseUrl + 'token';
    const body = `grant_type=password&username=${username}&password=${password}`;
    const requestHeader = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post(url, body,  { headers: requestHeader} );
  }

  getUserClaims() {
    const reqHeaders = new HttpHeaders({Authorization : 'Bearer ' + localStorage.getItem(CommonConstants.token.usersTokenConstant)});
    return this.http.get(environment.ApiBaseUrl + 'users/claims', {headers: reqHeaders});
  }

  getStoredAuthorizationToken(): string {
      return localStorage.getItem(CommonConstants.token.usersTokenConstant);
  }

  hasPermisionFor(allowedRoles: string[]): boolean {
    const userRoles: string[] = JSON.parse(localStorage.getItem(CommonConstants.user.userRolesKeyConstant));

    userRoles.forEach(userRole => {
      allowedRoles.forEach(allowedRole => {
        if (userRole === allowedRole) {
          return true;
        }
      });
    });
    return false;
  }

  logout() {
    localStorage.removeItem(CommonConstants.token.usersTokenConstant);
    this.router.navigate(['login']);
  }

  private LoadAvailableRoles() {
    this.roleService.getAllRoles().subscribe(data => this.availableRoles = data);
  }
}
