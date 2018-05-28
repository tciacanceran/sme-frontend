import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from  './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(): boolean{
    if(this.authService.loggedIn()){ //if token is present, it returns true
      return true
    } else  {
      this.router.navigate(['/login']) //if token is not present, return false, redirect to login
      return false
    }
  }
}
