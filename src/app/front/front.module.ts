// Module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

// Component
import { FrontComponent } from './front.component';

// Service
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';

const routes: Routes = [
  { path: '', component: FrontComponent }
]

@NgModule({
  declarations: [FrontComponent],
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
export class FrontModule { }
