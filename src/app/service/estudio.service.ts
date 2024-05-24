import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../shared/config';
import { Observable } from 'rxjs';
import { EstudioDTO } from '../dto/about/estudioDTO';
import { TokenInterceptorService } from './token-interceptor.service'; // Ajusta la ruta según tu estructura de archivos

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
    // Obtén el token del servicio TokenInterceptorService
    const token = this.tokenInterceptorService.getToken();

    // Verifica si el token está presente y es válido
    if (token && this.tokenInterceptorService.isTokenValid()) {
      // Establece el token en el interceptor (si es necesario)
      // this.tokenInterceptorService.setToken(token);

      // Clona la solicitud y agrega el encabezado de autorización con el token Bearer
      const authRequest = this.createAuthRequest(estudioDTO, token,this.URL+this.END_POINT_ADD);

      // Realiza la solicitud HTTP con la solicitud autenticada
      return this.http.post(this.URL+this.END_POINT_ADD, estudioDTO, { headers: authRequest.headers });
    } else {
      // Maneja el caso en el que el token no está presente o no es válido
      console.error('Token inválido o no presente.');
      // Puedes redirigir al usuario a iniciar sesión nuevamente o manejar según tus necesidades
      return new Observable(); // o lógica adicional según tus necesidades
    }
  }

  private createAuthRequest(data: EstudioDTO, token: string, URL: string): HttpRequest<EstudioDTO> {
    // Crea una nueva solicitud clonando la original y agregando el encabezado de autorización
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

  eliminarEstudio(id: number): Observable<void> {
    const token = this.tokenInterceptorService.getToken();
    if (token && this.tokenInterceptorService.isTokenValid()) {
      const url = `${this.URL}${this.END_POINT_DELETE}`;
      const body = { id: id }; // Crea el cuerpo de la solicitud con el id
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
  
      // Aquí realizamos una solicitud DELETE pero enviamos el cuerpo como si fuera una solicitud POST
      return this.http.delete<void>(url, { headers: headers, body: body });
    } else {
      console.error('Token inválido o no presente.');
      return new Observable(); 
    }
  }
}

