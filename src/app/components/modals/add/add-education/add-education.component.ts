import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { EstudioDTO } from 'src/app/dto/about/estudioDTO';
import { EstudioService } from 'src/app/service/estudio.service';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css']
})
export class AddEducationComponent implements OnInit {

  estudioForm: FormGroup;
  maxFechaInicio: string;
  maxFechaHoy: string;

  constructor(private fb: FormBuilder, private datePipe: DatePipe, private estudioService: EstudioService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.estudioForm = this.fb.group({
      id: [null, [Validators.min(1)]],
      nombre: [null, [Validators.required]],
      facultad: [null, [Validators.required]],
      descripcion: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      inicio: [null, [this.validateFechaInicio.bind(this)]],  // No es requerido inicialmente
      fin: [null],
      finalizado: [false],
      idPersona: [null]
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
    const isFormValid = this.estudioForm.valid;
    const fechaInicioControl = this.estudioForm.get('inicio');
    const fechaFinControl = this.estudioForm.get('fin');
    const finalizadoControl = this.estudioForm.get('finalizado');

    // Lógica para manejar las validaciones condicionales de fecha de inicio y fin
    if (finalizadoControl.value) {
      fechaInicioControl.setValidators([Validators.required, this.validateFechaInicio.bind(this)]);
      fechaFinControl.setValidators([Validators.required, (control) => this.validateFechaFin(fechaInicioControl.value)]);
    } else {
      fechaInicioControl.setValidators([Validators.required, this.validateFechaInicio.bind(this)]);
      fechaFinControl.clearValidators();
    }

    fechaInicioControl.updateValueAndValidity();
    fechaFinControl.updateValueAndValidity();

    if (!isFormValid) {
      // Log de errores específicos por campo
      if (fechaInicioControl.errors) {
        console.log("Errores en 'inicio': ", fechaInicioControl.errors);
      }

      if (fechaFinControl.errors) {
        console.log("Errores en 'fin': ", fechaFinControl.errors);
      }

      if (finalizadoControl.errors) {
        console.log("Errores en 'finalizado': ", finalizadoControl.errors);
      }
    } else {
      console.log("FORMULARIO OK")
    }

    return isFormValid;
  }





  guardarEstudio(): void {
    if (this.estudioForm.valid) {
      const estudioDTO: EstudioDTO = this.mapFormToEstudioDTO();

      this.estudioService.guardarEstudio(estudioDTO).subscribe(
        (response) => {
          console.log('Estudio guardado exitosamente:', response);
        },
        (error) => {
          console.error('Error al guardar el estudio:', error);
        }
      );
    } else {
      // Manejo de errores si es necesario
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
      return null;  // No hay fechas para comparar
    }

    const fechaInicioFormateada = new Date(this.formatoFecha(fechaInicio));
    const fechaFinFormateada = new Date(this.formatoFecha(fechaFin));
    const fechaHoy = new Date();

    const diferenciaEnMilisegundos = fechaFinFormateada.getTime() - fechaInicioFormateada.getTime();

    if (diferenciaEnMilisegundos < 0) {
      return { invalidRange: true };  // La fecha de fin no puede ser anterior a la de inicio
    }

    if (this.estudioForm.get('finalizado').value && fechaFinFormateada.getTime() > fechaHoy.getTime()) {
      return { fechaFinPosteriorAHoy: true };  // La fecha de fin no puede ser posterior a la actual si el estudio está finalizado
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

  private mapFormToEstudioDTO(): EstudioDTO {
    return {
      id: this.estudioForm.get('id').value,
      nombre: this.estudioForm.get('nombre').value,
      facultad: this.estudioForm.get('facultad').value,
      descripcion: this.estudioForm.get('descripcion').value,
      inicio: this.estudioForm.get('inicio').value,
      fin: this.estudioForm.get('fin').value,
      finalizado: this.estudioForm.get('finalizado').value,
      idPersona: this.estudioForm.get('idPersona').value,
    };
  }
}
