import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Carrera } from 'src/app/dto/resumen/carrera';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css'],
  providers: [DatePipe]  // Provee el DatePipe aquí
})
export class EditEducationComponent implements OnInit {

  estudioForm: FormGroup;
  maxFechaInicio: string;
  maxFechaHoy: string;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private datePipe: DatePipe  // Agrega DatePipe en el constructor
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.cargarDatos();
  }

  private initForm(): void {
    this.estudioForm = this.fb.group({
      id: [null, [Validators.min(1)]],
      nombre: [null, [Validators.required]],
      facultad: [null, [Validators.required]],
      descripcion: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      inicio: [null, [this.validateFechaInicio.bind(this)]],
      fin: [null],
      finalizado: [false],
    }, { validators: [this.validateFechas] });

    const fechaFinControl = this.estudioForm.get('fin');
    fechaFinControl.setValidators([
      Validators.required,
      (control) => this.validateFechaFin(this.estudioForm.get('inicio').value),
    ]);
    fechaFinControl.disable();

    this.estudioForm.get('inicio').valueChanges.subscribe(() => {
      this.actualizarFechaFinControl();
    });

    this.estudioForm.get('finalizado').valueChanges.subscribe(() => {
      this.actualizarFechaFinControl();
    });

    const fechaActual = new Date();
    const fechaActualFormateada = this.formatoFecha(fechaActual);

    this.maxFechaInicio = fechaActualFormateada;
    this.maxFechaHoy = fechaActualFormateada;

    this.actualizarFechaFinControl();
  }

  private cargarDatos(): void {
    const carrera: Carrera = this.config.data.entity;
    this.estudioForm.patchValue({
      id: carrera.id,
      nombre: carrera.nombre,
      facultad: carrera.facultad,
      descripcion: carrera.descripcion,
      inicio: carrera.inicio,
      fin: carrera.fin,
      finalizado: carrera.finalizado
    });
  }

  private actualizarFechaFinControl(): void {
    const fechaFinControl = this.estudioForm.get('fin');
    const finalizadoControl = this.estudioForm.get('finalizado');
    const fechaInicioControl = this.estudioForm.get('inicio');

    if (fechaInicioControl.value) {
      fechaFinControl.enable();
    } else {
      fechaFinControl.disable();
    }

    if (fechaInicioControl.value && finalizadoControl.value) {
      fechaFinControl.setValidators([
        Validators.required,
        (control) => {
          const fechaFin = new Date(control.value).setHours(0, 0, 0, 0);
          const fechaInicio = new Date(fechaInicioControl.value).setHours(0, 0, 0, 0);
          const fechaHoy = new Date().setHours(0, 0, 0, 0);

          return fechaFin && fechaFin >= fechaInicio && fechaFin <= fechaHoy ? null : { invalidRange: true };
        },
        (control) => {
          const fechaFin = new Date(control.value).setHours(0, 0, 0, 0);
          const fechaInicio = new Date(fechaInicioControl.value).setHours(0, 0, 0, 0);

          return fechaFin && fechaFin >= fechaInicio ? null : { fechaFinAnteriorAInicio: true };
        },
      ]);
    } else {
      fechaFinControl.clearValidators();
    }

    fechaFinControl.updateValueAndValidity();
  }

  private formatoFecha(fecha: Date): string {
    return this.datePipe.transform(fecha, 'yyyy-MM-dd') || '';
  }

  puedeGuardar(): boolean {
    return this.estudioForm.valid;
  }

  guardarEstudio(): void {
    if (this.estudioForm.valid) {
      // Aquí se debería realizar la lógica para guardar el estudio
    }
  }

  private validateFechaInicio(control: AbstractControl): { [key: string]: boolean } | null {
    const fechaInicio = control.value as Date;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return fechaInicio && fechaInicio > hoy ? { fechaInicioPosteriorAHoy: true } : null;
  }

  private validateFechaFin(control: AbstractControl): { [key: string]: boolean } | null {
    const fechaInicio = this.estudioForm.get('inicio').value;
    const fechaFin = control.value;

    if (!fechaInicio || !fechaFin) {
      return null;
    }

    const fechaInicioFormateada = new Date(this.formatoFecha(fechaInicio));
    const fechaFinFormateada = new Date(this.formatoFecha(fechaFin));
    const fechaHoy = new Date();

    const diferenciaEnMilisegundos = fechaFinFormateada.getTime() - fechaInicioFormateada.getTime();

    if (diferenciaEnMilisegundos < 0) {
      return { invalidRange: true };
    }

    if (this.estudioForm.get('finalizado').value && fechaFinFormateada.getTime() > fechaHoy.getTime()) {
      return { fechaFinPosteriorAHoy: true };
    }

    return null;
  }

  private validateFechas(group: FormGroup): { [key: string]: boolean } | null {
    const inicio = group.get('inicio');
    const fin = group.get('fin');
    const finalizado = group.get('finalizado');

    if (!inicio.value && fin.value) {
      return { inicioRequerido: true };
    }

    const fechaHoy = new Date();

    if (fin.value && fin.value < inicio.value) {
      return { fechasIncorrectas: true };
    }

    if (finalizado.value && fin.value > fechaHoy) {
      return { fechasIncorrectasFinalizado: true };
    }

    return null;
  }
}
