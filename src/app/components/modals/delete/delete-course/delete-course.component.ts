import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CursoService } from 'src/app/service/curso.service';
import { EstudioService } from 'src/app/service/estudio.service'; // Ajusta la ruta según tu estructura de archivos

@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.component.html',
  styleUrls: ['./delete-course.component.css']
})
export class DeleteCourseComponent implements OnInit {

  id: number; // Variable para almacenar el ID del curso a eliminar

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private cursoService: CursoService
  ) { }

  ngOnInit(): void {
    // Recibir el ID del curso del parámetro 'data' pasado al abrir el diálogo
    this.id = this.config.data.id;
  }

  cancel() {
    this.ref.close(); // Cerrar la ventana modal sin eliminar el curso
  }

  confirm() {
    // Lógica para eliminar el curso utilizando el ID recibido
    this.cursoService.eliminarCurso(this.id).subscribe(
      
      () => {
        console.log("ID CURSO: ", this.id)
        console.log('Curso eliminado');
      },
      (error: any) => { // Mantenemos el tipo de datos como 'any'
        console.log("ID CURSO: ", this.id)
        console.error('Error al eliminar el curso', error);
        // Manejar el error según sea necesario
      }
    );
    this.ref.close();
  }
}
