import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = "http://192.168.0.78:8000/auth/login"; //login url
  private logoutUrl = "http://192.168.0.78:8000/auth/logout"; //logout url

  constructor(private http: HttpClient, private router: Router) { }

  login(user){ //makes the http call to the backend api, and the backend send backs the response of the login user details
    return this.http.post<any>(this.loginUrl, user); //any to return the observable without any errors
  }

  loggedIn(){ //return true or false if the token exists in the browser
    return !!localStorage.getItem('token')
  }

  getToken(){ //fetch the token value
    return localStorage.getItem('token')
  }

  logout(user){

    // console.log(localStorage.token)
    // let headers = new HttpHeaders({'x-access-token': localStorage.token});
    // return this.http.post<any>(this.logoutUrl,{}, {headers:headers}).subscribe(
    //   res => console.log(res),
    //   err => console.log(err)
    // )
    localStorage.removeItem('token')
    this.router.navigate(['/login']) //return to login
  }
}
