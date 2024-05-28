import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { Observable } from 'rxjs';
import { Experiencia } from '../dto/resumen/experiencia';
import { AppConfig } from '../shared/config';

@Injectable({
  providedIn: 'root',
})
export class ExperienciaService {
  readonly END_POINT_ADD = '/experiencia/add';
  readonly END_POINT_DELETE = '/experiencia/delete';
  readonly END_POINT_UPDATE = '/experiencia/update';
  readonly END_POINT_GET = '/experiencia/list';
  readonly URL = `${AppConfig.host}:${AppConfig.port}`;

  constructor(
    private http: HttpClient,
    private tokenInterceptorService: TokenInterceptorService
  ) {}

  guardarExperiencia(experiencia: Experiencia): Observable<any> {
    const token = this.tokenInterceptorService.getToken();
    if (token && this.tokenInterceptorService.isTokenValid()) {
      const authRequest = this.createAuthRequest(experiencia, token, `${this.URL}${this.END_POINT_ADD}`);
      return this.http.post(`${this.URL}${this.END_POINT_ADD}`, experiencia, { headers: authRequest.headers });
    } else {
      console.error('Token inválido o no presente.');
      return new Observable();
    }
  }

  actualizarExperiencia(experiencia: Experiencia): Observable<any> {
    const token = this.tokenInterceptorService.getToken();
    if (token && this.tokenInterceptorService.isTokenValid()) {
      const authRequest = this.createAuthRequest(experiencia, token, `${this.URL}${this.END_POINT_UPDATE}`);
      return this.http.put(`${this.URL}${this.END_POINT_UPDATE}`, experiencia, { headers: authRequest.headers });
    } else {
      console.error('Token inválido o no presente.');
      return new Observable();
    }
  }

  eliminarExperiencia(id: number): Observable<void> {
    const token = this.tokenInterceptorService.getToken();
    if (token && this.tokenInterceptorService.isTokenValid()) {
      const url = `${this.URL}${this.END_POINT_DELETE}`;
      const body = { id: id };
      const authRequest = this.createAuthRequest(body as Experiencia, token, url);
      return this.http.delete<void>(url, { headers: authRequest.headers, body: body });
    } else {
      console.error('Token inválido o no presente.');
      return new Observable();
    }
  }

  obtenerExperiencias(): Observable<Experiencia[]> {
    const token = this.tokenInterceptorService.getToken();
    if (token && this.tokenInterceptorService.isTokenValid()) {
      const url = `${this.URL}${this.END_POINT_GET}`;
      const authRequest = this.createAuthRequest(null, token, url);
      return this.http.get<Experiencia[]>(url, { headers: authRequest.headers });
    } else {
      console.error('Token inválido o no presente.');
      return new Observable<Experiencia[]>();
    }
  }

  private createAuthRequest(data: Experiencia | null, token: string, URL: string): HttpRequest<Experiencia | null> {
    const authRequest = new HttpRequest<Experiencia | null>(
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
