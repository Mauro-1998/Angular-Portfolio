import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../shared/config';
import { Observable } from 'rxjs';
import { EstudioDTO } from '../dto/about/estudioDTO';
import { TokenInterceptorService } from './token-interceptor.service';

@Injectable({
  providedIn: 'root',
})
export class EstudioService {
  readonly END_POINT_ADD = '/estudio/add';
  readonly END_POINT_DELETE = '/estudio/delete'
  readonly END_POINT_UPDATE = '/estudio/update'
  readonly END_POINT_GET = '/estudio/list'
  readonly URL = `${AppConfig.host}:${AppConfig.port}`;

  constructor(
    private http: HttpClient,
    private tokenInterceptorService: TokenInterceptorService
  ) {}

  guardarEstudio(estudioDTO: EstudioDTO): Observable<any> {
    const token = this.tokenInterceptorService.getToken();
    if (token && this.tokenInterceptorService.isTokenValid()) {
      const authRequest = this.createAuthRequest(estudioDTO, token, this.URL + this.END_POINT_ADD);
      return this.http.post(this.URL + this.END_POINT_ADD, estudioDTO, { headers: authRequest.headers });
    } else {
      console.error('Token inválido o no presente.');
      return new Observable();
    }
  }

  eliminarEstudio(id: number): Observable<void> {
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

  actualizarEstudio(estudioDTO: EstudioDTO): Observable<any> {
    const token = this.tokenInterceptorService.getToken();
    if (token && this.tokenInterceptorService.isTokenValid()) {
      const authRequest = this.createAuthRequest(estudioDTO, token, this.URL + this.END_POINT_UPDATE);
      return this.http.put(this.URL + this.END_POINT_UPDATE, estudioDTO, { headers: authRequest.headers });
    } else {
      console.error('Token inválido o no presente.');
      return new Observable();
    }
  }

  private createAuthRequest(data: EstudioDTO, token: string, URL: string): HttpRequest<EstudioDTO> {
    const authRequest = new HttpRequest<EstudioDTO>(
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


  obtenerEstudios(): Observable<EstudioDTO[]> {
    const token = this.tokenInterceptorService.getToken();
    if (token && this.tokenInterceptorService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });

      return this.http.get<EstudioDTO[]>(`${this.URL}${this.END_POINT_GET}`, { headers: headers });
    } else {
      console.error('Token inválido o no presente.');
      return new Observable<EstudioDTO[]>();
    }
  }
}
