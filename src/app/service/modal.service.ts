import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AddCourseComponent } from '../components/modals/add-course/add-course.component';
import { AddEducationComponent } from '../components/modals/add-education/add-education.component';
import { AddExperienceComponent } from '../components/modals/add-experience/add-experience.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private dialogService: DialogService) {}

  openAddExperienceModal() {
    this.dialogService.open(AddExperienceComponent, {
      header: 'Agregar Experiencia',
      width: '70%',
      contentStyle: {'max-height': '500px', 'overflow': 'auto'}
    });
  }

  openAddEducationModal() {
    this.dialogService.open(AddEducationComponent, {
      header: 'Agregar Educación',
      width: '70%',
      contentStyle: {'max-height': '500px', 'overflow': 'auto'}
    });
  }

  openAddCourseModal() {
    this.dialogService.open(AddCourseComponent, {
      header: 'Agregar Curso',
      width: '70%',
      contentStyle: {'max-height': '500px', 'overflow': 'auto'}
    });
  }
}