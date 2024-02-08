import { Component, Input, OnInit } from '@angular/core';
import { Curso } from 'src/app/dto/resumen/curso';
import { ModalService } from 'src/app/service/modal.service';
import { TokenInterceptorService } from 'src/app/service/token-interceptor.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  isHovered: boolean = false;
  isLoginOK: boolean = false;
  componentType: 'course' = 'course';

  @Input() cursos: Curso[];

  constructor(private tokenInterceptorService: TokenInterceptorService) { }

  ngOnInit(): void {
    if (this.tokenInterceptorService.hasToken() && this.tokenInterceptorService.isTokenValid) {
      this.isLoginOK = true;
    } else {
      // console.log('No hay token disponible. No se carga el componente.');
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
      // Lógica para eliminar un elemento de cursos con el ID proporcionado
      console.log('Eliminar elemento de cursos con ID:', event.id);
    }
  }
}
