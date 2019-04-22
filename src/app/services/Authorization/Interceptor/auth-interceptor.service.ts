import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor() { }

   // Comprueba si la request viene del formulario de login
   private isLoginRequest(req: HttpRequest<any>): boolean {
    return (/token/i.test(req.url) && !/refreshtoken/i.test(req.url));
  }
}
