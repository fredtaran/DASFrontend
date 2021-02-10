import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  errMsg = "";
  required_flag = false;

  authForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit() {
    const myToken = this.cookieService.get('my-token');
    if(myToken) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/']);
    }
  }

  // Login Button
  login() {
    let data = this.authForm.value;

    if(this.authForm.valid) {
      this.apiService.loginUser(data).subscribe( data => {
        this.cookieService.set('my-token', data.token);
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.errMsg = "Incorrect username/password.";
        this.authForm.controls['password'].setValue('');
      })
    } else {
      this.required_flag = true;
    }
  }

}
