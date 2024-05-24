import { Injectable } from '@angular/core';
import { AppConfig } from '../shared/config';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Curso } from '../dto/resumen/curso';


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

  

  // Método para obtener los cursos desde el servidor
  obtenerCursos(): Observable<Curso[]> {
    const url = `${this.URL}${this.END_POINT_GET}`; // URL del endpoint para obtener la lista de cursos

    // Realiza la solicitud HTTP para obtener los cursos
    return this.http.get<Curso[]>(url);
  }

  guardarCurso(cursoDTO: Curso): Observable<any> {
    // Obtén el token del servicio TokenInterceptorService
    const token = this.tokenInterceptorService.getToken();

    console.log("finalizado: ",cursoDTO.finalizado);
    console.log("inicio: ",cursoDTO.inicio);
    console.log("fin: ",cursoDTO.fin);

    // Verifica si el token está presente y es válido
    if (token && this.tokenInterceptorService.isTokenValid()) {
      // Establece el token en el interceptor (si es necesario)
      // this.tokenInterceptorService.setToken(token);

      // Clona la solicitud y agrega el encabezado de autorización con el token Bearer
      const authRequest = this.createAuthRequest(cursoDTO, token, this.URL + this.END_POINT_ADD);

      // Realiza la solicitud HTTP con la solicitud autenticada
      return this.http.post(this.URL + this.END_POINT_ADD, cursoDTO, { headers: authRequest.headers })
        .pipe(
          tap(() => this.notifyCursoChange()) // Notificar cambio después de guardar el curso
        );
    } else {
      // Maneja el caso en el que el token no está presente o no es válido
      console.error('Token inválido o no presente.');
      // Puedes redirigir al usuario a iniciar sesión nuevamente o manejar según tus necesidades
      return new Observable(); // o lógica adicional según tus necesidades
    }
  }

  private createAuthRequest(data: Curso, token: string, URL: string): HttpRequest<Curso> {
    // Crea una nueva solicitud clonando la original y agregando el encabezado de autorización
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
  
      // Construir el cuerpo de la solicitud con el id
      const body = { id: id };
  
      // Realizar la solicitud DELETE con el cuerpo y el encabezado de autorización
      return this.http.delete<void>(url, { headers: headers, body: body })
        .pipe(
          tap(() => this.notifyCursoChange()) // Notificar cambio después de eliminar el curso
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
