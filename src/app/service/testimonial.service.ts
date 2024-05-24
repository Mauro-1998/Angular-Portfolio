import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { Observable } from 'rxjs';
import { Referencias } from '../dto/about/referencias';
import { AppConfig } from '../shared/config';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private readonly END_POINT_ADD = '/referencia/add';
  private readonly END_POINT_DELETE = '/referencia/delete';
  private readonly END_POINT_UPDATE = '/referencia/update';
  private readonly END_POINT_GET = '/referencia/list';
  private readonly URL = `${AppConfig.host}:${AppConfig.port}`;

  constructor(
    private http: HttpClient,
    private tokenInterceptorService: TokenInterceptorService
  ) { }

  guardarReferencia(referencia: Referencias): Observable<any> {
    const token = this.tokenInterceptorService.getToken();
    if (token && this.tokenInterceptorService.isTokenValid()) {
      const authRequest = this.createAuthRequest(referencia, token, `${this.URL}${this.END_POINT_ADD}`);
      return this.http.post(`${this.URL}${this.END_POINT_ADD}`, referencia, { headers: authRequest.headers });
    } else {
      console.error('Token inválido o no presente.');
      return new Observable();
    }
  }

  private createAuthRequest(data: Referencias, token: string, URL: string): HttpRequest<Referencias> {
    const authRequest = new HttpRequest<Referencias>(
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

  eliminarReferencia(id: number): Observable<void> {
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

  obtenerReferencias(): Observable<Referencias[]> {
    const url = `${this.URL}${this.END_POINT_GET}`;
    return this.http.get<Referencias[]>(url);
  }

  actualizarReferencia(referencia: Referencias): Observable<any> {
    const token = this.tokenInterceptorService.getToken();
    if (token && this.tokenInterceptorService.isTokenValid()) {
      const authRequest = this.createAuthRequest(referencia, token, `${this.URL}${this.END_POINT_UPDATE}`);
      return this.http.put(`${this.URL}${this.END_POINT_UPDATE}`, referencia, { headers: authRequest.headers });
    } else {
      console.error('Token inválido o no presente.');
      return new Observable();
    }
  }
}
