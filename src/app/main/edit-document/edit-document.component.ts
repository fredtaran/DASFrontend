import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.css']
})
export class EditDocumentComponent implements OnInit {

  // icons
  icons = {
    'faExclamationTriangle': faExclamationTriangle 
  }

  has_attachment = false;
  attachment_link = '';
  categories = [];
  id: any;
  document_no: any;
  is_unique = false;
  title = '';

  // Form details
  updateForm = new FormGroup({
    'document_no': new FormControl(''),
    'barcode': new FormControl(''),
    'title': new FormControl('', Validators.required),
    'date_completed': new FormControl('', Validators.required),
    'category': new FormControl('', Validators.required),
    'type': new FormControl('', Validators.required),
    'attachment': new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private apiService: ApiService
  ) { 
    this.id = route.snapshot.paramMap.get('id');
    this.document_no = route.snapshot.paramMap.get('document_no');
  }

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

    this.apiService.getDocument(this.id, this.document_no).subscribe(
      document => {
        this.attachment_link = document['attachment'];
        this.title = document['title'];
        this.updateForm.controls['document_no']?.setValue(document['document_no']);
        this.updateForm.controls['barcode']?.setValue(document['barcode']);
        this.updateForm.controls['title']?.setValue(document['title']);
        this.updateForm.controls['date_completed']?.setValue(document['date_completed']);
        this.updateForm.controls['category']?.setValue(document['category']['id']);
        this.updateForm.controls['type']?.setValue(document['type'] ? '1' : '0');
      },
      error => {

      }
    )
  } // ngOnInit End

  onFileChange(event: any) {
    this.updateForm.patchValue({
      'attachment': event.target.files[0]
    })
  }

  // Update document
  updateDocument() {

  }

}
