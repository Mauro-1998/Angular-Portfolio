import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../shared/config';
import { Observable } from 'rxjs';
import { Experiencia } from '../dto/resumen/experiencia';
import { TokenInterceptorService } from './token-interceptor.service'; // Ajusta la ruta según tu estructura de archivos

@Injectable({
  providedIn: 'root',
})
export class ExperienciaService {
  private readonly END_POINT_ADD = '/experiencia/add';
  private readonly END_POINT_DELETE = '/experiencia/delete'
  private readonly END_POINT_UPDATE = '/experiencia/update'
  private readonly END_POINT_GET = '/experiencia/list'
  private readonly URL = `${AppConfig.host}:${AppConfig.port}`;

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

  private createAuthRequest(data: Experiencia, token: string, URL: string): HttpRequest<Experiencia> {
    const authRequest = new HttpRequest<Experiencia>(
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

  eliminarExperiencia(id: number): Observable<void> {
    const token = this.tokenInterceptorService.getToken();
    if (token && this.tokenInterceptorService.isTokenValid()) {
      const url = `${this.URL}${this.END_POINT_DELETE}`;
      const body = { id: id };
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      return this.http.delete<void>(url, { headers: headers, body: body });
    } else {
      console.error('Token inválido o no presente.');
      return new Observable(); 
    }
  }
}
