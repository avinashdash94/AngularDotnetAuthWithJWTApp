import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //any alteration in httpRequest can be done here

   //Creating clone of request and adding header on the reqest  
  let tokenHeader = httpRequest.clone({
    setHeaders:{
      Authorization: "bearer " + localStorage.getItem("token")
    }
  });
  //Returning new requeste with header
  return next.handle(tokenHeader);
}
}
