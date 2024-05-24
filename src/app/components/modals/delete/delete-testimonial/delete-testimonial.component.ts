import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TestimonialService } from 'src/app/service/testimonial.service'; // Ajusta la ruta según tu estructura de archivos

@Component({
  selector: 'app-delete-testimonial',
  templateUrl: './delete-testimonial.component.html',
  styleUrls: ['./delete-testimonial.component.css']
})
export class DeleteTestimonialComponent implements OnInit {

  id: number; // Variable para almacenar el ID del testimonio a eliminar

  constructor(
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private testimonialService: TestimonialService
  ) { }

  ngOnInit(): void {
    // Recibir el ID del testimonio del parámetro 'data' pasado al abrir el diálogo
    this.id = this.config.data.id;
  }

  cancel() {
    this.ref.close(); // Cerrar la ventana modal sin eliminar el testimonio
  }

  confirm() {
    // Lógica para eliminar el testimonio utilizando el ID recibido
    console.log("Vamos a eliminar el testimonio con ID: ", this.id)
    this.testimonialService.eliminarReferencia(this.id).subscribe(
      () => {
        console.log("ID Testimonio: ", this.id)
        console.log('Testimonio eliminado');
        this.ref.close();
      },
      (error: any) => { // Mantenemos el tipo de datos como 'any'
        console.error('Error al eliminar el testimonio', error);
        // Manejar el error según sea necesario
      }
    );
  }
}
