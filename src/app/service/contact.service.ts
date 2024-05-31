import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../shared/config';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly END_POINT = "/api/contact";
  private readonly URL = `${AppConfig.host}:${AppConfig.port}${this.END_POINT}`;

  constructor(private http: HttpClient) { }

  sendContactForm(contactForm: any): Observable<any> {
    return this.http.post(this.URL, contactForm, { responseType: 'text' });
  }
}
