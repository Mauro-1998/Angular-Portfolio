import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Experiencia } from 'src/app/dto/resumen/experiencia';
import { DatePipe } from '@angular/common';
import { ExperienciaService } from 'src/app/service/experiencia.service';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css'],
  providers: [DatePipe]
})
export class EditExperienceComponent implements OnInit {
  experienceForm: FormGroup;
  maxFechaHoy: string;

  constructor(
    private formBuilder: FormBuilder,
    private config: DynamicDialogConfig,
    private experienciaService: ExperienciaService,
    private datePipe: DatePipe, // Agrega DatePipe en el constructor
    private ref: DynamicDialogRef
  ) {
    const today = new Date();
    this.maxFechaHoy = this.formatoFecha(today); // Formatea la fecha actual al inicializar el componente
  }

  ngOnInit(): void {
    this.initForm();
    this.cargarDatos();
  }

  private initForm(): void {
    this.experienceForm = this.formBuilder.group({
      id: [null],
      empresa: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      puesto: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      descripcion: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      inicio: [null, [Validators.required]],
      fin: [null],
      actual: [false, Validators.required]
    }, {
      validators: [] // Puedes agregar validadores personalizados aquí si es necesario
    });

    this.experienceForm.get('actual').valueChanges.subscribe(() => {
      this.updateFinValidators();
    });

    this.experienceForm.get('inicio').valueChanges.subscribe(() => {
      this.updateFinValidators();
    });

    this.updateFinValidators();
  }

  private cargarDatos(): void {
    const experiencia: Experiencia = this.config.data.entity;
    this.experienceForm.patchValue({
      id: experiencia.id,
      empresa: experiencia.empresa,
      puesto: experiencia.puesto,
      descripcion: experiencia.descripcion,
      inicio: this.formatoFecha(experiencia.inicio),
      fin: this.formatoFecha(experiencia.fin),
      actual: experiencia.actual
    });
  }

  private updateFinValidators(): void {
    const finControl = this.experienceForm.get('fin');
    const actual = this.experienceForm.get('actual').value;

    if (actual) {
      finControl.clearValidators();
      finControl.disable();
      finControl.setValue(null);
    } else {
      finControl.enable();
      finControl.setValidators([Validators.required]);
    }

    finControl.updateValueAndValidity();
  }

  formatoFecha(fecha: Date): string {
    return this.datePipe.transform(fecha, 'yyyy-MM-dd') || ''; // Utiliza DatePipe para formatear la fecha
  }

  onSubmit(): void {
    if (this.experienceForm.valid) {
      const experiencia: Experiencia = this.experienceForm.value;
      this.experienciaService.actualizarExperiencia(experiencia).subscribe(
        response => {
          // Manejo de la respuesta si es necesario
          console.log('Experiencia actualizada:', response);
        },
        error => {
          console.error('Error al actualizar experiencia:', error);
        }
      );
    } else {
      console.log('Formulario no válido.');
    }
    this.ref.close();
  }
}
