import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    // let header = new HttpHeaders().set(
    //   "Authorization", "bearer " + localStorage.getItem("token")
    // );
    // console.log(localStorage.getItem("token"));
    // return  new Observable<string>(observer => {
    //   this.http
    //     .get<string>('https://localhost:44313/api/Users/GetAllUsers',{headers: header})
    //     .subscribe(res => {
    //       observer.next(res);
    //     });
    // });

    return  new Observable<string>(observer => {
      this.http
        .get<string>('https://localhost:44313/api/Users/GetAllUsers',)
        .subscribe(res => {
          observer.next(res);
        });
    });
  }

  addNewUser(user: any):Observable<any[]>{
    return new Observable<any>(observer => {
      this.http
        .post<any>(
          'https://localhost:44313/api/Users',user
        )
        .subscribe(
          res => {
            observer.next(res);
          },
          error => {
            observer.next(null);
          }
        );
    });
   
  }
}
