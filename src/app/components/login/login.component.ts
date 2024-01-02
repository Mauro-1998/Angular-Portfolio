import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { timer } from "rxjs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenInterceptorService } from 'src/app/service/token-interceptor.service';
import * as jwt_decode from 'jwt-decode';

interface JwtResponse {
  token: string;
}

interface ErrorResponse {
  error: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showClass: boolean = false;
  loginForm: FormGroup;

  private readonly HOST = 'http://localhost';
  private readonly PORT = '8080';
  private readonly END_POINT = "/api/v1/auth/authenticate"
  readonly URL = `${this.HOST}:${this.PORT}${this.END_POINT}`;


  errorMessage: string = '';
  okMessage: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient, private fb: FormBuilder, private tokenInterceptorService: TokenInterceptorService) { }

  ngOnInit(): void {
    const delay = timer(300);
    delay.subscribe(() => {
      this.showClass = true;
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.loading = true;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = this.loginForm.value;

    this.http.post<JwtResponse | ErrorResponse>(this.URL, body, { headers }).subscribe(
      (mappedResponse) => {
        console.log('Mapped Response:', mappedResponse);
        this.loading = false;

        if (this.isJwtResponse(mappedResponse)) {
          const jwtResponse = mappedResponse as JwtResponse;
          const expirationDate = this.getExpirationDateFromToken(jwtResponse.token);

          if (expirationDate && expirationDate > new Date()) {
            this.setBearerToken(jwtResponse.token);
            this.handleOKResponse();
          } else {
            console.log('Token expirado. No se carga el componente.');
          }
        } else if (this.isErrorResponse(mappedResponse)) {
          const errorResponse = mappedResponse as ErrorResponse;
          this.handleErrorResponse(errorResponse);
        } else {
          // Handle other cases if needed
        }
      },
      (error) => {
        this.loading = false;
        if (this.isHttpErrorResponse(error)) {
          const httpErrorResponse = error as HttpErrorResponse;
          this.handleErrorResponse(httpErrorResponse);
        }
      }
    );
  }
  

  private isJwtResponse(response: any): response is JwtResponse {
    return (response as JwtResponse).token !== undefined;
  }

  private isErrorResponse(response: any): response is ErrorResponse {
    return (response as ErrorResponse).error !== undefined;
  }

  private isHttpErrorResponse(response: any): response is HttpErrorResponse {
    return (response as HttpErrorResponse).headers !== undefined;
  }

  private setBearerToken(token: string): void {
    this.tokenInterceptorService.setToken(token);
  }

  private handleErrorResponse(error: HttpErrorResponse | ErrorResponse): void {
    console.log('Error response from server:', error);

    if (error instanceof HttpErrorResponse) {
      if (error.status === 400) {
        if (typeof error.error === 'string') {
          this.errorMessage = error.error; // Muestra el mensaje de error específico del servidor
        } else if (error.error) {
          this.errorMessage = 'Error inesperado. Por favor, inténtalo de nuevo.'; // Mensaje genérico

          // Itera sobre las claves del objeto de error y maneja cada error
          Object.keys(error.error).forEach((key) => {
            const control = this.loginForm.get(key);
            if (control) {
              control.setErrors({ serverError: error.error[key] });
            }
          });

          // Maneja el caso específico de "Bad credentials"
          if (error.error.error === 'Bad credentials') {
            this.errorMessage = 'Credenciales incorrectas. Por favor, verifica tus datos.';
          }
        } else {
          this.errorMessage = 'Error inesperado. Por favor, inténtalo de nuevo.'; // Mensaje genérico
        }
      } else {
        this.errorMessage = 'Error inesperado. Por favor, inténtalo de nuevo.'; // Mensaje genérico para otros errores HTTP
      }
    } else {
      // Aquí manejas el objeto ErrorResponse
      this.errorMessage = error.error;
    }
    this.okMessage = '';
    // Puedes mostrar el mensaje de error en tu interfaz de usuario como prefieras
  }

  private handleOKResponse(): void {
    this.okMessage = 'Login OK';
    this.errorMessage = '';
    console.log('Login OK message:', this.okMessage);
  }


  private getExpirationDateFromToken(token: string): Date | null {
    try {
      // Cambio en la forma de acceder a la función decode
      const decodedToken: any = jwt_decode.jwtDecode(token);
      if (decodedToken && decodedToken.exp) {
        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(decodedToken.exp);
        return expirationDate;
      }
      return null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}