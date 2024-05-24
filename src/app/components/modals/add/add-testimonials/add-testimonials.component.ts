import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Referencias } from 'src/app/dto/about/referencias'; // Ajusta la ruta según tu estructura de archivos
import { TestimonialService } from 'src/app/service/testimonial.service'; // Ajusta la ruta según tu estructura de archivos

@Component({
  selector: 'app-add-testimonials',
  templateUrl: './add-testimonials.component.html',
  styleUrls: ['./add-testimonials.component.css']
})
export class AddTestimonialsComponent implements OnInit {
  testimonialForm: FormGroup;
  urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

  constructor(
    private formBuilder: FormBuilder,
    private testimonialService: TestimonialService
  ) { }

  ngOnInit(): void {
    this.testimonialForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      puesto: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      descripcion: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(300)]],
      fotoURL: ['', [Validators.required, Validators.pattern(this.urlPattern)]],
      idPersona: [null]
    });
  }

  onSubmit(): void {
    if (this.testimonialForm.valid) {
      const referencia: Referencias = new Referencias(
        this.testimonialForm.value.descripcion,
        this.testimonialForm.value.nombre,
        this.testimonialForm.value.fotoURL,
        this.testimonialForm.value.puesto,
        this.testimonialForm.value.idPersona
      );

      this.testimonialService.guardarReferencia(referencia).subscribe(
        (response) => {
          console.log('Referencia guardada exitosamente:', response);
        },
        (error) => {
          console.error('Error al guardar la referencia:', error);
        }
      );
    } else {
      console.log('Formulario no válido.');
    }
  }
}
