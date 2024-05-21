import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDTO } from '../dto/resumen/responseDTO';
import { AppConfig } from '../shared/config';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private readonly END_POINT = "/front/resume";
  private readonly URL = `${AppConfig.host}:${AppConfig.port}${this.END_POINT}`;

  private resumeChangesSubject: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  getResume(email: string): Observable<ResponseDTO> {
    const apiUrl = `${this.URL}?email=${email}`;

    return this.http.get(apiUrl).pipe(
      map((data: any) => new ResponseDTO(data.experiencias, data.carreras, data.cursos))
    );
  }

  notifyResumeChanges() {
    this.resumeChangesSubject.next();
  }

  resumeChanges(): Observable<void> {
    return this.resumeChangesSubject.asObservable();
  }

  // Supongamos que tienes un método para actualizar datos en la base de datos
  // Este método debería notificar a los observadores sobre el cambio
  updateResumeData(email: string, newData: any): Observable<any> {
    // Lógica para actualizar datos en la base de datos
    return this.http.put(`${this.URL}/update?email=${email}`, newData).pipe(
      map(response => {
        // Después de actualizar los datos, notifica a los observadores sobre los cambios
        this.notifyResumeChanges();
        return response;
      })
    );
  }
}
