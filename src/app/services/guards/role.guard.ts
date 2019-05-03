import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from '../Authorization/auth.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {}
  canActivate(
   next: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): boolean {
    const roles = next.data.roles as Array<string>;
    if (roles) {
      const hasPermision = this.authService.hasPermisionFor(roles);
      if (!hasPermision) {
        this.router.navigate(['home/forbidden']);
      }

      return hasPermision;
    } else {
      this.router.navigate(['home/forbidden']);
      return false;
    }
   }
}
