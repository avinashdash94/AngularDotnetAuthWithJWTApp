import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,private http: HttpClient) {}
  
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  login(user: any): Observable<any> {
    console.log(user);
    return new Observable<any>(observer => {
      this.http
        .post<any>(
          'https://localhost:44313/api/Account',user
        )
        .subscribe(
          res => {
            this.setToken(res.token);
            observer.next(res);
          },
          error => {
            observer.next(null);
          }
        );
    });
  
    // if (email === 'admin@gmail.com' && password === 'admin123') {
    //   this.setToken('abcdefghijklmnopqrstuvwxyz');
    //   return of({ name: 'Tarique Akhtar', email: 'admin@gmail.com' });
    // }
    // return throwError(new Error('Failed to login'));
  }
}
