import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from '../Authorization/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
   next: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): boolean {
    const roles = next.data.roles as Array<string>;
    if (roles) {
      return this.authService.hasPermisionFor(roles);
    } else {
      // this.router.navigate(['/forbidden']);
      // toast
      return false;
    }
   }
}