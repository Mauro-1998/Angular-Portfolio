import { Component, Input, OnInit } from '@angular/core';
import { Carrera } from 'src/app/dto/resumen/carrera';
import { TokenInterceptorService } from 'src/app/service/token-interceptor.service';
import { ModalService } from 'src/app/service/modal.service';

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

  constructor(private tokenInterceptorService: TokenInterceptorService, private modalService: ModalService) { }

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

 
}
