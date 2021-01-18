import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  faPlusCircle = faPlusCircle;

  constructor(
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

  add_doc() {
    this.router.navigate(['/add_document']);
  }

}
