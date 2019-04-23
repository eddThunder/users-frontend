import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }
  // auth: AuthService;
  // router: Router;
  // constructor(private inj: Injector) {}

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   this.auth = this.inj.get(AuthService);
  //   this.router = this.inj.get(Router);
  //   // Get the auth header from the service.
  //   const authHeader = this.auth.getStoredAuthorizationToken();
  //   // Clone the request to add the new header.
  //   let authReq;
  //   if (this.isLoginRequest(req)) {
  //     authReq = req.clone({headers: req.headers.set('Content-Type', 'application/x-www-form-urlencoded')});
  //   } else {
  //     authReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${authHeader}`)});
  //   }
  //   // Pass on the cloned request instead of the original request.
  //   return next.handle(authReq).do(
  //     (event: HttpEvent<any>) => {
  //       if (event instanceof HttpResponse) {
  //         console.log('valid token');
  //       }
  //     },
  //     (err: any) => {
  //       if (err instanceof HttpErrorResponse) {
  //         console.log(err);

  //         if (err.status === 401) {
  //           this.auth.logout();
  //         }
  //       }
  //     }
  //   );
  // }

  // // Comprueba si la request viene del formulario de login
  // private isLoginRequest(req: HttpRequest<any>): boolean {
  //   return (/token/i.test(req.url));
  // }
}
