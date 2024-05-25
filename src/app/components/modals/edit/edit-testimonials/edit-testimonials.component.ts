import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Referencias } from 'src/app/dto/about/referencias';
import { TestimonialService } from 'src/app/service/testimonial.service';

@Component({
  selector: 'app-edit-testimonials',
  templateUrl: './edit-testimonials.component.html',
  styleUrls: ['./edit-testimonials.component.css']
})
export class EditTestimonialsComponent implements OnInit {
  referencia: Referencias;
  testimonialForm: FormGroup;
  urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

  constructor(private fb: FormBuilder, private config: DynamicDialogConfig, private testimonialService: TestimonialService) {}

  ngOnInit(): void {
    this.referencia = this.config.data.entity;
    this.initializeForm();
  }

  initializeForm() {
    this.testimonialForm = this.fb.group({
      id:this.referencia.id,
      nombre: [this.referencia.nombre, Validators.required],
      descripcion: [this.referencia.descripcion, [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      urlFoto: [this.referencia.urlFoto, [Validators.required, Validators.pattern(this.urlPattern)]],
      puesto: [this.referencia.puesto, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.testimonialForm.valid) {
      const referencia: Referencias = this.testimonialForm.value;
      this.testimonialService.actualizarReferencia(referencia).subscribe(
        response => {
          // Manejo de la respuesta si es necesario
          console.log('Referencia actualizada:', response);
        },
        error => {
          console.error('Error al actualizar referencia:', error);
        }
      );
    } else {
      console.log('Formulario no válido.');
    }
  }

  puedeGuardar() {
    return this.testimonialForm.valid;
  }
}
