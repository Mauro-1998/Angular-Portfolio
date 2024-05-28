import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AppConfig } from '../shared/config';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Curso } from '../dto/resumen/curso';
import { TokenInterceptorService } from './token-interceptor.service';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private cursoChangesSubject = new Subject<void>();

  readonly END_POINT_ADD = '/curso/add';
  readonly END_POINT_DELETE = '/curso/delete';
  readonly END_POINT_UPDATE = '/curso/update';
  readonly END_POINT_GET = '/curso/list';
  readonly URL = `${AppConfig.host}:${AppConfig.port}`;

  constructor(
    private http: HttpClient,
    private tokenInterceptorService: TokenInterceptorService
  ) {}

  get cursoChanges$(): Observable<void> {
    return this.cursoChangesSubject.asObservable();
  }

  private notifyChanges(): void {
    this.cursoChangesSubject.next();
  }

  obtenerCursos(): Observable<Curso[]> {
    const token = this.tokenInterceptorService.getToken();
    if (token && this.tokenInterceptorService.isTokenValid()) {
      const url = `${this.URL}${this.END_POINT_GET}`;
      const authRequest = this.createAuthRequest(null, token, url);
      return this.http.get<Curso[]>(url, { headers: authRequest.headers });
    } else {
      console.error('Token inválido o no presente.');
      return new Observable<Curso[]>();
    }
  }

  guardarCurso(cursoDTO: Curso): Observable<any> {
    const token = this.tokenInterceptorService.getToken();
    if (token && this.tokenInterceptorService.isTokenValid()) {
      const url = `${this.URL}${this.END_POINT_ADD}`;
      const authRequest = this.createAuthRequest(cursoDTO, token, url);
      return this.http.post(url, cursoDTO, { headers: authRequest.headers }).pipe(
        tap(() => this.notifyChanges()) // Notifica cambios
      );
    } else {
      console.error('Token inválido o no presente.');
      return new Observable();
    }
  }

  eliminarCurso(id: number): Observable<void> {
    const token = this.tokenInterceptorService.getToken();
    if (token && this.tokenInterceptorService.isTokenValid()) {
      const url = `${this.URL}${this.END_POINT_DELETE}`;
      const body = { id: id };
      const authRequest = this.createAuthRequest(body as Curso, token, url);
      return this.http.delete<void>(url, { headers: authRequest.headers, body: body }).pipe(
        tap(() => this.notifyChanges()) // Notifica cambios
      );
    } else {
      console.error('Token inválido o no presente.');
      return new Observable();
    }
  }

  actualizarCurso(cursoDTO: Curso): Observable<any> {
    const token = this.tokenInterceptorService.getToken();
    if (token && this.tokenInterceptorService.isTokenValid()) {
      const url = `${this.URL}${this.END_POINT_UPDATE}`;
      const authRequest = this.createAuthRequest(cursoDTO, token, url);
      return this.http.put(url, cursoDTO, { headers: authRequest.headers }).pipe(
        tap(() => this.notifyChanges()) // Notifica cambios
      );
    } else {
      console.error('Token inválido o no presente.');
      return new Observable();
    }
  }

  private createAuthRequest(data: Curso | null, token: string, URL: string): HttpRequest<Curso | null> {
    const authRequest = new HttpRequest<Curso | null>(
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
}
