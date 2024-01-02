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

  @Input() cursos: Curso[];

  constructor(private tokenInterceptorService: TokenInterceptorService, private modalService: ModalService) { }

  
  ngOnInit(): void {
    console.log(this.cursos);
    console.log("Cursos: " + JSON.stringify(this.cursos))
    if (this.tokenInterceptorService.hasToken() && this.tokenInterceptorService.isTokenValid) {
      this.isLoginOK = true;
    } else {
      console.log('No hay token disponible. No se carga el componente.');
    }
  }


  hoverButtonColor() {
    this.isHovered = true;
  }

  resetButtonColor() {
    this.isHovered = false;
  }

  openAddCourseModal() {
    this.modalService.openAddCourseModal();
  }

}
