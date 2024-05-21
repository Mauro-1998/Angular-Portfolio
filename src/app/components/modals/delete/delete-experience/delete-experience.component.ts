import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-delete-experience',
  standalone: true,
  imports: [],
  templateUrl: './delete-experience.component.html',
  styleUrl: './delete-experience.component.css'
})
export class DeleteExperienceComponent {

  constructor(public ref: DynamicDialogRef) { }

  cancel() {
    this.ref.close(); // Cerrar la ventana modal sin eliminar la experiencia
  }

  confirm() {
    // Lógica para eliminar la experiencia
    console.log('Experiencia eliminada');
    this.ref.close();
  }
}
