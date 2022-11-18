import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../dto/resumen/responseDTO';


@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  

  constructor(private http: HttpClient) { }

  getResume():Observable<ResponseDTO>{
    return this.http.post<ResponseDTO>('https://portfolio-mauro-molina.herokuapp.com/persona/listar-persona-resume',{email:"molinamauro12@gmail.com"})

  }
}