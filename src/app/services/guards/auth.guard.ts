import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { CommonConstants } from '../../constants/constants';
import { AuthService } from '../Authorization/auth.service';


@Injectable()
export class AuthGuard implements  CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
 canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean {

    if (localStorage.getItem(CommonConstants.token.usersTokenConstant)) {

      const roles = next.data.roles as Array<string>;
      if (roles) {
        return this.authService.hasPermisionFor(roles);
      } else {
        this.router.navigate(['/forbidden']);
        return false;
      }

    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
