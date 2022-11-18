import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../dto/about/responseDTO';


@Injectable({
  providedIn: 'root'
})
export class AboutService {
  

  constructor(private http: HttpClient) { }

  getUser():Observable<ResponseDTO>{
    return this.http.post<ResponseDTO>('https://portfolio-mauro-molina.herokuapp.com/persona/listar-persona-aboutMe',{email:"molinamauro12@gmail.com"})

  }
}
