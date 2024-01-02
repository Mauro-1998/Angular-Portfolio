import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ResponseDTO } from '../dto/about/responseDTO';

@Injectable({
  providedIn: 'root'
})

export class AboutService {
  private readonly HOST = "http://localhost";
  private readonly PORT = "8080";
  private readonly END_POINT = "/front/about-me";
  private readonly URL = `${this.HOST}:${this.PORT}${this.END_POINT}`;

  constructor(private http: HttpClient) { }

  getUser(email: string): Observable<ResponseDTO> {
    const apiUrl = `${this.URL}?email=${email}`;
    
    return this.http.get(apiUrl).pipe(
      map((data: any) => new ResponseDTO(data.referencias, data.userDTO))
    );
  }
}