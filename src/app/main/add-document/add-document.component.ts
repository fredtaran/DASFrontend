import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit {

  // icons
  icons = {
    'faExclamationTriangle': faExclamationTriangle 
  }

  addForm = new FormGroup({
    'document_no': new FormControl('', Validators.required),
    'barcode': new FormControl('', Validators.required),
    'title': new FormControl('', Validators.required),
    'date_completed': new FormControl('', Validators.required),
    'category': new FormControl('', Validators.required),
    'type': new FormControl('', Validators.required),
    'attachment': new FormControl('', Validators.required),
  });

  has_attachment = false;
  is_unique = false;
  categories = [];
  errMsg = "";

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) { } // constructor End

  ngOnInit() {
    const myToken = this.cookieService.get('my-token');
    if(!myToken) {
      this.router.navigate(['/']);
    } // Check if authenticated End

    this.apiService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      },
      error => {
        console.log(error);
      }
    ); // getCategories API call end
  } // ngOnInit End

  onFileChange(event: any) {
    this.addForm.patchValue({
      'attachment': event.target.files[0]
    })
  }

  saveDocument() {
    if(this.addForm.valid) {
      const fd = new FormData();
      fd.append('document_no', this.addForm.get('document_no')?.value);
      fd.append('barcode', this.addForm.get('barcode')?.value);
      fd.append('title', this.addForm.get('title')?.value);
      fd.append('date_completed', this.addForm.get('date_completed')?.value);
      fd.append('category', this.addForm.get('category')?.value);
      fd.append('type', this.addForm.get('type')?.value);
      fd.append('attachment', this.addForm.get('attachment')?.value);

      this.apiService.saveDocument(fd).subscribe(
        data => {
          this.router.navigate(['/dashboard']);
        },
        error => {
          // console.log(error.error.non_field_errors[0]);
          this.is_unique = true;
          this.errMsg = "Document with document no: " + this.addForm.get('document_no')?.value + " and barcode: " + this.addForm.get('barcode')?.value + " already exists.";
        }
      )
    } else {
      this.has_attachment = true;
    }
  }
}