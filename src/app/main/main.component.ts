import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { faPlusCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnDestroy, OnInit {
  displayToConsole(datatableElement: DataTableDirective): void {
    datatableElement.dtInstance.then((dtInstance: DataTables.Api) => console.log(dtInstance));
  }

  faPlusCircle = faPlusCircle;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  dtOptions: DataTables.Settings = {};
  documents = [];
  dtTrigger: Subject<any> = new Subject<any>();
  
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    const myToken = this.cookieService.get('my-token');
    if(myToken) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/']);
    }

    // Datatable options
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
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

  // Route to add document page
  add_doc() {
    this.router.navigate(['/add_document']);
  }

  // Route to edit document page
  edit_doc(id: number, document_no: number) {
    this.router.navigate(['/edit_document', id, document_no]);
  }

  // Delete button function
  delete_doc(id: any, document_no: any) {
    Swal.fire({
      title: 'Are you sure you want to delete this record?',
      text: `All data pertaining with Document No: ${ document_no } will be deleted PERMANENTLY`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete permanently',
      confirmButtonColor: '#fcbf49',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if(result.value) {
        // Delete sequence
        this.apiService.deleteDocument(id).subscribe(
          success => {
            Swal.fire({
              title: 'Successfully Deleted',
              text: `Document No: ${ document_no } has been deleted permanently`,
              icon: 'success',
            }).then(() => {
              window.location.reload();
            })
          },
          error => {
            Swal.fire({
              title: 'Error Message',
              text: error,
              icon: 'warning',
            }).then(() => {
              window.location.reload();
            })
          }
        )
      }
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
