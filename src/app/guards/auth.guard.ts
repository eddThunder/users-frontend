import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { CommonConstants } from '../constants/constants';


@Injectable()
export class AuthGuard implements  CanActivate {
  constructor(private router: Router) {}
 canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean {
    if (localStorage.getItem(CommonConstants.token.usersTokenConstant)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }
}
