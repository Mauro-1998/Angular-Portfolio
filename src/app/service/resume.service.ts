import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDTO } from '../dto/resumen/responseDTO';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  
  private readonly HOST = "http://localhost";
  private readonly PORT = "8080";
  private readonly END_POINT = "/front/resume";
  private readonly URL = `${this.HOST}:${this.PORT}${this.END_POINT}`;
  
  constructor(private http: HttpClient) { }

  getResume(email: string): Observable<ResponseDTO> {
    const apiUrl = `${this.URL}?email=${email}`;
    
    // Ajusta cómo creas la instancia de ResponseDTO para incluir los cursos
    return this.http.get(apiUrl).pipe(
      map((data: any) => new ResponseDTO(data.experiencias, data.carreras, data.cursos))
    );
  }
}