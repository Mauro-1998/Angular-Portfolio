import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-delete-testimonial',
  templateUrl: './delete-testimonial.component.html',
  styleUrls: ['./delete-testimonial.component.css']
})
export class DeleteTestimonialComponent {

  constructor(public ref: DynamicDialogRef) { }

  cancel() {
    this.ref.close(); // Cerrar la ventana modal sin eliminar el testimonio
  }

  confirm() {
    // Lógica para eliminar el testimonio
    console.log('Testimonio eliminado');
    this.ref.close();
  }
}
