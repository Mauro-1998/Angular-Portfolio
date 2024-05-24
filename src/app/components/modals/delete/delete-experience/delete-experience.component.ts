import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExperienciaService } from 'src/app/service/experiencia.service';

@Component({
  selector: 'app-delete-experience',
  standalone: true,
  imports: [],
  templateUrl: './delete-experience.component.html',
  styleUrl: './delete-experience.component.css'
})
export class DeleteExperienceComponent {

  id: number; // Variable para almacenar el ID de la experiencia a eliminar

  constructor(public ref: DynamicDialogRef, private config: DynamicDialogConfig, private experienciaService: ExperienciaService) { }

  ngOnInit(): void {
    // Recibir el ID del curso del parámetro 'data' pasado al abrir el diálogo
    console.log("SETTING ID: " + this.id)
    this.id = this.config.data.id;
  }

  cancel() {
    this.ref.close(); // Cerrar la ventana modal sin eliminar la experiencia
  }

  confirm() {
    // Lógica para eliminar el curso utilizando el ID recibido
    this.experienciaService.eliminarExperiencia(this.id).subscribe(
      () => {
        console.log("ID Experiencia: ", this.id)
        console.log('Experiencia eliminada');
        this.ref.close();
      },
      (error: any) => { // Mantenemos el tipo de datos como 'any'
        console.log("ID Experiencia: ", this.id)
        console.error('Error al eliminar la experiencia', error);
        // Manejar el error según sea necesario
      }
    );
  }
}
