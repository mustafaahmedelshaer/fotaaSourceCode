import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}
  access_token =  localStorage.getItem('access_token');

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    let tokenizedreq = request.clone({
      setHeaders:{
        Authorization: ""+this.access_token
      }
    })
    return next.handle(tokenizedreq)


  }
}
