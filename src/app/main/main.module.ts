// Module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

// Component
import { MainComponent } from './main.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { DetailDocumentComponent } from './detail-document/detail-document.component';

// Service
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { EditDocumentComponent } from './edit-document/edit-document.component';

const routes: Routes = [
  { path: 'dashboard', component: MainComponent },
  { path: 'add_document', component: AddDocumentComponent },
  { path: 'document_details/:id', component: DetailDocumentComponent },
  { path: 'edit_document/:id/:document_no', component: EditDocumentComponent}
]

@NgModule({
  declarations: [MainComponent, AddDocumentComponent, DetailDocumentComponent, EditDocumentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    ReactiveFormsModule,
    DataTablesModule
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
