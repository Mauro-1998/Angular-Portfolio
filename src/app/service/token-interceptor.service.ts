import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private token: string = '';

  constructor() {}

  setToken(token: string): void {
    this.token = token;
  }

  hasToken(): boolean {
    return !!this.token;
  }

  isTokenValid(): boolean {
    if (!this.token) {
      return false; // No hay token, considerarlo como no válido
    }

    try {
      const decodedToken: any = jwt_decode.jwtDecode(this.token);

      if (decodedToken && decodedToken.exp) {
        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(decodedToken.exp);

        // Compara la fecha de expiración con la fecha actual
        return expirationDate > new Date();
      }

      return false; // No hay información de expiración en el token
    } catch (error) {
      console.error('Error decoding token:', error);
      return false; // Error al decodificar el token
    }
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Obtén el token almacenado en el servicio
    const token = this.token;

    // Clona la solicitud y agrega el encabezado de autorización con el token Bearer
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Continúa con la solicitud clonada
    return next.handle(authRequest);
  }
}
