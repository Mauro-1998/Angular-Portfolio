import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Experiencia } from 'src/app/dto/resumen/experiencia';// Ajusta la ruta según tu estructura de archivos
import { ExperienciaService } from 'src/app/service/experiencia.service';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent implements OnInit {

  experienceForm: FormGroup;
  maxFechaHoy: string;

  constructor(private formBuilder: FormBuilder, private experienciaService: ExperienciaService, private ref: DynamicDialogRef) {
    const today = new Date();
    this.maxFechaHoy = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.experienceForm = this.formBuilder.group({
      id: [null],
      empresa: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      puesto: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      descripcion: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      inicio: [null, [Validators.required]],
      fin: [{ value: null, disabled: true }],
      actual: [false, Validators.required],
      idPersona: [null]
    }, {
      validators: [this.validateFechas]
    });

    this.experienceForm.get('actual').valueChanges.subscribe(() => {
      this.updateFinValidators();
    });

    this.experienceForm.get('inicio').valueChanges.subscribe(() => {
      this.updateFinValidators();
    });

    this.updateFinValidators();
  }

  updateFinValidators(): void {
    const finControl = this.experienceForm.get('fin');
    const inicioControl = this.experienceForm.get('inicio');
    const actual = this.experienceForm.get('actual').value;

    if (actual) {
      finControl.clearValidators();
      finControl.disable();
      finControl.setValue(null);
    } else {
      finControl.enable();
      finControl.setValidators([Validators.required]);
      if (inicioControl.value) {
        finControl.setValidators([Validators.required, this.dateAfterValidator(inicioControl.value)]);
      }
    }

    finControl.updateValueAndValidity();
  }

  dateAfterValidator(inicio: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fin = new Date(control.value);
      const start = new Date(inicio);
      return fin < start ? { 'dateAfter': true } : null;
    };
  }

  validateFechas(group: FormGroup): { [key: string]: any } | null {
    const inicio = group.get('inicio').value;
    const fin = group.get('fin').value;
    const actual = group.get('actual').value;

    if (inicio && fin && new Date(inicio) > new Date(fin)) {
      return { 'endDateInvalid': true };
    }

    if (actual && fin != null) {
      return { 'finDefinedWhenActual': true };
    }

    if (!actual && (!fin || new Date(fin) > new Date())) {
      return { 'finRequiredWhenNotActual': true };
    }

    return null;
  }

  onSubmit(): void {
    if (this.experienceForm.valid) {
      const experiencia: Experiencia = new Experiencia(
        this.experienceForm.value.empresa,
        this.experienceForm.value.inicio,
        this.experienceForm.value.fin,
        this.experienceForm.value.descripcion,
        this.experienceForm.value.actual,
        this.experienceForm.value.puesto,
        this.experienceForm.value.id // Suponiendo que idPersona es el id de la experiencia
      );

      this.experienciaService.guardarExperiencia(experiencia).subscribe(
        (response) => {
          console.log('Experiencia guardada exitosamente:', response);
        },
        (error) => {
          console.error('Error al guardar la experiencia:', error);
        }
      );
    } else {
      console.log('Formulario no válido.');
    }
    this.ref.close();
  }
}
