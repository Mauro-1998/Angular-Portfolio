import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AppConfig } from '../shared/config';
import { BehaviorSubject, Observable } from 'rxjs';
import { Curso } from '../dto/resumen/curso';
import { TokenInterceptorService } from './token-interceptor.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  readonly END_POINT_ADD = '/curso/add';
  readonly END_POINT_DELETE = '/curso/delete'
  readonly END_POINT_UPDATE = '/curso/update'
  readonly END_POINT_GET = '/curso/list'
  readonly URL = `${AppConfig.host}:${AppConfig.port}`;

  private cursoChangeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private tokenInterceptorService: TokenInterceptorService
  ) { }

  obtenerCursos(): Observable<Curso[]> {
    const url = `${this.URL}${this.END_POINT_GET}`;
    return this.http.get<Curso[]>(url);
  }

  guardarCurso(cursoDTO: Curso): Observable<any> {
    const token = this.tokenInterceptorService.getToken();
    if (token && this.tokenInterceptorService.isTokenValid()) {
      const authRequest = this.createAuthRequest(cursoDTO, token, this.URL + this.END_POINT_ADD);
      return this.http.post(this.URL + this.END_POINT_ADD, cursoDTO, { headers: authRequest.headers })
        .pipe(
          tap(() => this.notifyCursoChange())
        );
    } else {
      console.error('Token inválido o no presente.');
      return new Observable();
    }
  }

  private createAuthRequest(data: Curso, token: string, URL: string): HttpRequest<Curso> {
    const authRequest = new HttpRequest<Curso>(
      'POST',
      URL,
      data,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      }
    );
    return authRequest;
  }

  eliminarCurso(id: number): Observable<void> {
    const token = this.tokenInterceptorService.getToken();
    if (token && this.tokenInterceptorService.isTokenValid()) {
      const url = `${this.URL}${this.END_POINT_DELETE}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
  
      const body = { id: id };
  
      return this.http.delete<void>(url, { headers: headers, body: body })
        .pipe(
          tap(() => this.notifyCursoChange())
        );
    } else {
      console.error('Token inválido o no presente.');
      return new Observable();
    }
  }
  
  actualizarCurso(cursoDTO: Curso): Observable<any> {
    console.log("Actualizado " , cursoDTO)
    const token = this.tokenInterceptorService.getToken();
    if (token && this.tokenInterceptorService.isTokenValid()) {
      const authRequest = this.createAuthRequest(cursoDTO, token, this.URL + this.END_POINT_UPDATE);
      return this.http.put(this.URL + this.END_POINT_UPDATE, cursoDTO, { headers: authRequest.headers })
        .pipe(
          tap(() => this.notifyCursoChange())
        );
    } else {
      console.error('Token inválido o no presente.');
      return new Observable();
    }
  }

  notifyCursoChange(): void {
    this.cursoChangeSubject.next(true);
  }

  getCursoChangeObservable(): Observable<boolean> {
    return this.cursoChangeSubject.asObservable();
  }

}
