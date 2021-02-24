import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { ApiService } from '../api.service';
import { faEye, faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent implements OnInit, OnDestroy {

  faEye = faEye;
  faDownload = faDownload;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private apiService: ApiService
  ) { }

  dtOptions: DataTables.Settings = {};
  documents = [];
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    const myToken = this.cookieService.get('my-token');
    if(myToken) {
      this.router.navigate(['/dashboard']);
    }

    // Datatable options
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      order: []
    };

    // Gather data from the database
    this.apiService.getDocuments().subscribe( 
      docs => {
        this.documents = docs;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      },
      error => {
         console.log(error);
      }
    )
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
