import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddDocumentComponent } from './add-document/add-document.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'dashboard', component: MainComponent },
  { path: 'add_document', component: AddDocumentComponent }
]

@NgModule({
  declarations: [MainComponent, AddDocumentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ApiService,
    CookieService
  ]
})
export class MainModule { }
