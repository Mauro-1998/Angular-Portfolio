import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css']
})
@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css']
})
export class AddEducationComponent implements OnInit {
  estudioForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.estudioForm = this.formBuilder.group({
      id: [''], // No es requerido por defecto
      nombre: ['', Validators.required],
      facultad: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      inicio: ['', [Validators.required, this.validateStartDate.bind(this)]],
      fin: ['', [this.validateEndDate.bind(this)]],
      finalizado: [false, Validators.required],
    });
  }

  validateStartDate(control:AbstractControl) {
    const startDate = new Date(control.value);
    const currentDate = new Date();

    if (startDate > currentDate) {
      return { invalidStartDate: true };
    }

    if (!this.estudioForm.get('fin').value) {
      // Reiniciar la validación de la fecha de fin si cambia la fecha de inicio
      this.estudioForm.get('fin').setErrors(null);
    }

    return null;
  }

  validateEndDate(control: AbstractControl) {
    const endDate = new Date(control.value);
    const startDate = new Date(this.estudioForm.get('inicio').value);
    const currentDate = new Date();

    if (endDate > currentDate || endDate < startDate) {
      return { invalidEndDate: true };
    }

    return null;
  }

  onSubmit() {
    // Validar todo el formulario antes de continuar
    if (this.estudioForm.valid) {
      // Aquí puedes manejar la lógica para guardar o actualizar la entidad
      console.log(this.estudioForm.value);
    } else {
      // Mostrar errores o mensajes de validación al usuario
      console.log('Formulario inválido');
    }
  }
}
