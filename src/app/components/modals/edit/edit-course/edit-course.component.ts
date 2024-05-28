import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Curso } from 'src/app/dto/resumen/curso';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CursoService } from 'src/app/service/curso.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  curso: Curso;
  cursoForm: FormGroup;
  maxFechaHoy: string;

  constructor(
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private cursoService: CursoService,
    private ref: DynamicDialogRef
  ) {}

  ngOnInit() {
    this.curso = this.config.data.entity;

    // Verificar que this.curso.certificadoURL tiene un valor asignado
    console.log('Datos del curso:', this.curso);

    this.cursoForm = this.fb.group({
      id: [this.curso.id, Validators.required],
      nombre: [this.curso.nombre, Validators.required],
      descripcion: [this.curso.descripcion, [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      inicio: [this.curso.inicio, [Validators.required, this.pastOrPresentValidator]],
      fin: [this.curso.fin, [this.finValidator.bind(this)]],
      finalizado: [this.curso.finalizado],
      certificado: [this.curso.certificado, [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?')]]
    });

    const hoy = new Date();
    this.maxFechaHoy = hoy.toISOString().split('T')[0];

    // Watch for changes in "finalizado" and "inicio" to revalidate "fin"
    this.cursoForm.get('finalizado').valueChanges.subscribe(() => {
      this.cursoForm.get('fin').updateValueAndValidity();
    });
    this.cursoForm.get('inicio').valueChanges.subscribe(() => {
      this.cursoForm.get('fin').updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.cursoForm.valid) {
      let cursoActualizado: Curso = {
        id: this.curso.id,
        nombre: this.cursoForm.value.nombre,
        descripcion: this.cursoForm.value.descripcion,
        inicio: this.cursoForm.value.inicio,
        fin: this.cursoForm.value.fin,
        finalizado: this.cursoForm.value.finalizado,
        certificado: this.cursoForm.value.certificado
      };

      this.cursoService.actualizarCurso(cursoActualizado).subscribe(
        response => {
          console.log('Curso actualizado exitosamente:', response);
        },
        error => {
          console.error('Error al actualizar el curso:', error);
        }
      );
    }
    this.ref.close();
  }

  puedeGuardar() {
    return this.cursoForm.valid;
  }

  // Custom Validators
  private pastOrPresentValidator(control: AbstractControl) {
    const today = new Date().toISOString().split('T')[0];
    return control.value && control.value <= today ? null : { pastOrPresent: true };
  }

  private finValidator(control: AbstractControl) {
    const inicio = this.cursoForm ? this.cursoForm.get('inicio').value : null;
    const finalizado = this.cursoForm ? this.cursoForm.get('finalizado').value : null;
    const fin = control.value;
    const today = new Date().toISOString().split('T')[0];

    if (finalizado && (!fin || fin > today)) {
      return { endDateInvalid: true };
    }
    if (!finalizado && fin) {
      return { endDateNotAllowed: true };
    }
    if (inicio && fin && fin < inicio) {
      return { endDateBeforeStartDate: true };
    }
    return null;
  }
}
