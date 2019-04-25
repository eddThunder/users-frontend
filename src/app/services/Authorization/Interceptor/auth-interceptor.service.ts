import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonConstants } from 'src/app/constants/constants';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authHeader = localStorage.getItem(CommonConstants.token.usersTokenConstant);

    let authReq;
    if (this.isLoginRequest(req)) {
      authReq = req.clone({headers: req.headers.set('Content-Type', 'application/x-www-form-urlencoded')});
    } else {
      authReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${authHeader}`)});
    }

    return next.handle(authReq).pipe(tap(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('token válido');
        }
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err);
          // AUTHORIZATION REQUIRED
          if (err.status === 401) {
            this.authService.logout();
          }
        }
      }
    ));
  }

  private isLoginRequest(req: HttpRequest<any>): boolean {
    return (/token/i.test(req.url));
  }
}
