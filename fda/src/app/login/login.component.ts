import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  userData = {}
  constructor(private router: Router,
              private http: HttpClient,
              private authService: AuthService) {}

  login(){
    this.authService.login(this.userData).subscribe( // call the service, pass the email and password, then subscribe to the observable that is returned
      res => {  //response data
        var data = res.data.items[0];
        console.log(res)
        localStorage.setItem('token', data.token) //store the token in the browser using the local storage
        console.log('token',data);
        this.router.navigate(['/dashboard']) //navigate to the dashboard
      },
      err => console.log(err) //error
    )
  }

    ngOnInit() {
    }

}
