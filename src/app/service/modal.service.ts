import { Injectable, Type } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AddCourseComponent } from '../components/modals/add/add-course/add-course.component';
import { AddEducationComponent } from '../components/modals/add/add-education/add-education.component';
import { AddExperienceComponent } from '../components/modals/add/add-experience/add-experience.component';
import { AddTestimonialsComponent } from '../components/modals/add/add-testimonials/add-testimonials.component';
import { EditEducationComponent } from '../components/modals/edit/edit-education/edit-education.component';
import { EditExperienceComponent } from '../components/modals/edit/edit-experience/edit-experience.component';
import { EditCourseComponent } from '../components/modals/edit/edit-course/edit-course.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private dialogService: DialogService) { }


  openEditModal(componentType: 'education' | 'experience' | 'course' | 'testimonials') {
    console.log("MODAL SERVICE: " + componentType)
    const options = {
      header: '',
      width: '70%',
      contentStyle: { 'max-height': '500px', 'overflow': 'auto' },
      styleClass: 'ui-dialog-dark',
      isUpdating: true // Ajusta esto según tus necesidades
    };
    switch (componentType) {
      case 'education':
        options.header = 'Editar Educación';
        this.dialogService.open(EditEducationComponent, options);
        break;
      case 'experience':
        options.header = 'Agregar Experiencia';
        this.dialogService.open(EditExperienceComponent, options);
        break;
      case 'course':
        options.header = 'Editar Curso';
        this.dialogService.open(EditCourseComponent, options);
        break;
      case 'testimonials':
        options.header = 'Editar Testimonio';
        this.dialogService.open(EditCourseComponent, options);
        break;

      default:
        // Manejo de caso por defecto (puedes ajustarlo según tus necesidades)
        break;
    }
  }



  openAddModal(componentType: 'education' | 'experience' | 'course' | 'testimonials') {
    console.log("MODAL SERVICE: " + componentType)

    const options = {
      header: '',
      width: '70%',
      contentStyle: { 'max-height': '500px', 'overflow': 'auto' },
      styleClass: 'ui-dialog-dark',
      isUpdating: false // Ajusta esto según tus necesidades
    };
    switch (componentType) {
      case 'education':
        options.header = 'Agregar Educación';
        this.dialogService.open(AddEducationComponent, options);
        break;
      case 'experience':
        options.header = 'Agregar Experiencia';
        this.dialogService.open(AddExperienceComponent, options);
        break;
      case 'course':
        options.header = 'Agregar Curso';
        this.dialogService.open(AddCourseComponent, options);
        break;
      case 'testimonials':
        options.header = 'Agregar Testimonio';
        this.dialogService.open(AddTestimonialsComponent, options);
        break;

      default:
        // Manejo de caso por defecto (puedes ajustarlo según tus necesidades)
        break;
    }
  }


}