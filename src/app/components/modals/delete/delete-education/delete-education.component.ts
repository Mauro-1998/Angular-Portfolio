import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EstudioService } from 'src/app/service/estudio.service';

@Component({
  selector: 'app-delete-education',
  standalone: true,
  imports: [],
  templateUrl: './delete-education.component.html',
  styleUrl: './delete-education.component.css'
})
export class DeleteEducationComponent {

  id: number; // Variable para almacenar el ID del curso a eliminar

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private estudioService: EstudioService) { }

  ngOnInit(): void {
    // Recibir el ID del curso del parámetro 'data' pasado al abrir el diálogo
    console.log("SETTING ID: " + this.id)
    this.id = this.config.data.id;
  }

  cancel() {
    this.ref.close(); // Cerrar la ventana modal sin eliminar el curso
  }

  confirm() {
    // Lógica para eliminar el curso utilizando el ID recibido
    this.estudioService.eliminarEstudio(this.id).subscribe(
      () => {
        console.log("ID Estudio: ", this.id)
        console.log('Estudio eliminado');
      },
      (error: any) => { // Mantenemos el tipo de datos como 'any'
        console.log("ID Estudio: ", this.id)
        console.error('Error al eliminar el estudio', error);
        // Manejar el error según sea necesario
      }
    );
    this.ref.close();
  }


}
