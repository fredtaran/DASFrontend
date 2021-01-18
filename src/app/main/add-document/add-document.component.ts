import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit {

  // icons
  icons = {
    'faPlusCircle': faPlusCircle 
  }

  categories = [];

  // FormGroup
  addForm = new FormGroup({
    document_no: new FormControl('', Validators.required),
    barcode: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    date_completed: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required)
  })

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router,
    private cd: ChangeDetectorRef
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

  // Change file attachment
  onFileChange(event: any) {
    let reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.addForm.patchValue({
          attachment: reader.result
        });

        this.cd.markForCheck();
      }
    }
  }

  save() {
    console.log(this.addForm.valid);
  }

}
