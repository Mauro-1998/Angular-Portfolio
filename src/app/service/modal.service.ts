import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AddCourseComponent } from '../components/modals/add/add-course/add-course.component';
import { AddEducationComponent } from '../components/modals/add/add-education/add-education.component';
import { AddExperienceComponent } from '../components/modals/add/add-experience/add-experience.component';
import { AddTestimonialsComponent } from '../components/modals/add/add-testimonials/add-testimonials.component';
import { EditEducationComponent } from '../components/modals/edit/edit-education/edit-education.component';
import { EditExperienceComponent } from '../components/modals/edit/edit-experience/edit-experience.component';
import { EditCourseComponent } from '../components/modals/edit/edit-course/edit-course.component';
import { EditTestimonialsComponent } from '../components/modals/edit/edit-testimonials/edit-testimonials.component';
import { DeleteTestimonialComponent } from '../components/modals/delete/delete-testimonial/delete-testimonial.component';
import { DeleteCourseComponent } from '../components/modals/delete/delete-course/delete-course.component';
import { DeleteExperienceComponent } from '../components/modals/delete/delete-experience/delete-experience.component';
import { DeleteEducationComponent } from '../components/modals/delete/delete-education/delete-education.component';

import { EstudioDTO } from '../dto/about/estudioDTO';
import { Experiencia } from '../dto/resumen/experiencia';
import { Curso } from '../dto/resumen/curso';
import { Referencias } from '../dto/about/referencias';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private dialogService: DialogService) { }

  

  openAddModal(componentType: 'education' | 'experience' | 'course' | 'testimonials') {
    console.log("MODAL Add SERVICE: " + componentType);
    const options = {
      header: '',
      width: '70%',
      contentStyle: { 'max-height': '500px', 'overflow': 'auto' },
      styleClass: 'ui-dialog-dark',
      isUpdating: false
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
        break;
    }
  }

  openDeleteModal(componentType: 'education' | 'experience' | 'course' | 'testimonials', id: number) {
    console.log("MODAL Delete SERVICE: " + componentType + " ID: " + id);
    const options = {
      header: '',
      width: '70%',
      contentStyle: { 'max-height': '500px', 'overflow': 'auto' },
      styleClass: 'ui-dialog-dark',
      data: { id: id }
    };
    switch (componentType) {
      case 'education':
        options.header = 'Eliminar Educación';
        this.dialogService.open(DeleteEducationComponent, options);
        break;
      case 'experience':
        options.header = 'Eliminar Experiencia';
        this.dialogService.open(DeleteExperienceComponent, options);
        break;
      case 'course':
        options.header = 'Eliminar Curso';
        this.dialogService.open(DeleteCourseComponent, options);
        break;
      case 'testimonials':
        options.header = 'Eliminar Testimonio';
        this.dialogService.open(DeleteTestimonialComponent, options);
        break;
      default:
        break;
    }
  }

  openEditModal(componentType: 'education' | 'experience' | 'course' | 'testimonials', entity: any) {
    console.log("MODAL Edit SERVICE: " + componentType + " Entity: ", entity);

    let castedEntity: EstudioDTO | Experiencia | Curso | Referencias;

    switch (componentType) {
      case 'education':
        castedEntity = entity as EstudioDTO;
        break;
      case 'experience':
        castedEntity = entity as Experiencia;
        break;
      case 'course':
        castedEntity = entity as Curso;
        break;
      case 'testimonials':
        castedEntity = entity as Referencias;
        break;
      default:
        throw new Error('Tipo de componente no soportado');
    }

    const options = {
      header: '',
      width: '70%',
      contentStyle: { 'max-height': '500px', 'overflow': 'auto' },
      styleClass: 'ui-dialog-dark',
      data: { entity: castedEntity },
      isUpdating: true
    };

    switch (componentType) {
      case 'education':
        options.header = 'Editar Educación';
        this.dialogService.open(EditEducationComponent, options);
        break;
      case 'experience':
        options.header = 'Editar Experiencia';
        this.dialogService.open(EditExperienceComponent, options);
        break;
      case 'course':
        options.header = 'Editar Curso';
        this.dialogService.open(EditCourseComponent, options);
        break;
      case 'testimonials':
        options.header = 'Editar Testimonio';
        this.dialogService.open(EditTestimonialsComponent, options);
        break;
      default:
        break;
    }
  }
}
