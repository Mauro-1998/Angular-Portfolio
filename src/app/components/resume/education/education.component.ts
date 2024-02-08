import { Component, Input, OnInit } from '@angular/core';
import { Carrera } from 'src/app/dto/resumen/carrera';

import { TokenInterceptorService } from 'src/app/service/token-interceptor.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  isHovered: boolean = false;

  isLoginOK: boolean = false;

  componentType: 'education' = 'education';
  
  @Input() carrera: Carrera[];

  
  constructor(private tokenInterceptorService: TokenInterceptorService) { }

  ngOnInit(): void {
    if (this.tokenInterceptorService.hasToken() && this.tokenInterceptorService.isTokenValid) {
      this.isLoginOK = true;
    } else {
      //console.log('No hay token disponible. No se carga el componente.');
    }
  }

  hoverButtonColor() {
    this.isHovered = true;
  }

  resetButtonColor() {
    this.isHovered = false;
  }

  
  deleteButtonClickHandler(event: { type: string, id: number }) {
    console.log(event);
    if (event.type === 'course') {
      // Accede al id y realiza la lógica necesaria
      console.log('Eliminar elemento de cursos con ID:', event.id);
    }
  }
  

}
