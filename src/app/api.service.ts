import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url = "http://127.0.0.1:8000/";

  // Base header
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  // Header with token
  private getAuthHeaders() {
    let token = this.cookieService.get('my-token');
    return new HttpHeaders({
      'Content-Type': 'application/json;',
      Authorization: `Token ${token}`
    })
  }

  // Header for fileupload
  private authHeaderFileUpload() {
    let token = this.cookieService.get('my-token');
    return new HttpHeaders({
      Authorization: `Token ${token}`
    })
  }

  // Login
  loginUser(authData: any) {
    const body = JSON.stringify(authData);
    return this.httpClient.post<any>(`${this.base_url}auth/`, body, { headers: this.headers });
  }

  // Get categories
  getCategories() {
    return this.httpClient.get<any>(`${this.base_url}api/category/`, { headers: this.getAuthHeaders() })
  }

  // Save document
  saveDocument(docDetails: any) {
    return this.httpClient.post<any>(`${this.base_url}api/document/`, docDetails, { headers: this.authHeaderFileUpload() })
  }

  // Get documents
  getDocuments() {
    return this.httpClient.get<any>(`${this.base_url}api/document/`, { headers: this.getAuthHeaders() });
  }

  // Delete document
  deleteDocument(id: number) {
    return this.httpClient.delete<any>(`${this.base_url}api/document/${id}`, { headers: this.getAuthHeaders() });
  }

  // Get specific document
  getDocument(id: number, document_no: any) {
    return this.httpClient.get<any>(`${this.base_url}api/document/${id}/`, { headers: this.getAuthHeaders() });
  }

  // Update document
  updateDocument(docDetails: any, id: number) {
    return this.httpClient.put<any>(`${this.base_url}api/document/${id}/`, docDetails, { headers: this.authHeaderFileUpload() });
  }
}
