import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CursoService } from 'src/app/service/curso.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  cursoForm: FormGroup;
  maxFechaHoy: string;

  constructor(private formBuilder: FormBuilder, 
              private cursoService: CursoService,
              private ref: DynamicDialogRef
  ) {
    const hoy = new Date();
    this.maxFechaHoy = hoy.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.cursoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      inicio: [null, [Validators.required, this.pastOrPresentValidator()]],
      fin: [{value: null, disabled: true}],
      finalizado: [false],
      certificadoURL: ['', [Validators.minLength(1), Validators.maxLength(300), Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?')]]
    }, {
      validators: [this.validateFechas]
    });

    this.cursoForm.get('finalizado').valueChanges.subscribe(() => {
      this.updateValidators();
    });

    this.cursoForm.get('inicio').valueChanges.subscribe(() => {
      this.updateValidators();
    });

    this.updateValidators();
  }

  pastOrPresentValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const date = new Date(control.value);
      const today = new Date();
      return date > today ? { 'pastOrPresent': true } : null;
    };
  }

  updateValidators(): void {
    const finControl = this.cursoForm.get('fin');
    const inicioControl = this.cursoForm.get('inicio');
    const certificadoURLControl = this.cursoForm.get('certificadoURL');
    const finalizado = this.cursoForm.get('finalizado').value;

    if (finalizado) {
      finControl.enable();
      finControl.setValidators([Validators.required, this.pastOrPresentValidator()]);
      certificadoURLControl.setValidators([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(300),
        Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?')
      ]);
      if (inicioControl.value) {
        finControl.setValidators([Validators.required, Validators.min(inicioControl.value), this.pastOrPresentValidator()]);
      }
    } else {
      finControl.clearValidators();
      finControl.disable();
      certificadoURLControl.setValidators([
        Validators.minLength(1),
        Validators.maxLength(300),
        Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?')
      ]);
    }

    finControl.updateValueAndValidity();
    certificadoURLControl.updateValueAndValidity();
  }

  validateFechas(group: FormGroup): {[key: string]: any} | null {
    const inicio = group.get('inicio').value;
    const fin = group.get('fin').value;
    const finalizado = group.get('finalizado').value;

    if (inicio && fin && new Date(inicio) > new Date(fin)) {
      return { 'endDateInvalid': true };
    }

    if (finalizado && (!fin || new Date(fin) > new Date())) {
      return { 'endDateInvalid': true };
    }

    if (!finalizado && fin) {
      return { 'endDateNotAllowed': true };
    }

    return null;
  }

  puedeGuardar(): boolean {
    return this.cursoForm.valid;
  }

  onSubmit(): void {
    if (this.cursoForm.valid) {
      this.cursoService.guardarCurso(this.cursoForm.value).subscribe(
        () => {
          console.log('Curso guardado correctamente.');
        },
        (error) => {
          console.error('Error al guardar el curso:', error);
        }
      );
    } else {
      console.log('El formulario no es válido. No se puede guardar el curso.');
    }
    this.ref.close();
  }
}
