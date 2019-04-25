import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonConstants } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  getAllRoles() {
    // const reqHeaders = new HttpHeaders({Authorization : 'Bearer ' + localStorage.getItem(CommonConstants.token.usersTokenConstant)});
    // return this.http.get(environment.ApiBaseUrl + 'roles/all', {headers: reqHeaders});

    return this.http.get(environment.ApiBaseUrl + 'roles/all');
  }
}
