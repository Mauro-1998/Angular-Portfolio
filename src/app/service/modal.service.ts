import { Injectable, Type } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AddCourseComponent } from '../components/modals/add-course/add-course.component';
import { AddEducationComponent } from '../components/modals/add-education/add-education.component';
import { AddExperienceComponent } from '../components/modals/add-experience/add-experience.component';
import { AddTestimonialsComponent } from '../components/modals/add-testimonials/add-testimonials.component';

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
        options.header = 'Agregar Educación';
        this.dialogService.open(AddEducationComponent, options);
        break;
      case 'experience':
        options.header = 'Agregar Educación';
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
        options.header = 'Agregar Educación';
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