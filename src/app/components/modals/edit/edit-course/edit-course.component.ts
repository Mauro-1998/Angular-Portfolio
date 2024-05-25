import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from 'src/app/dto/resumen/curso';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  curso: Curso;
  cursoForm: FormGroup;
  maxFechaHoy: string;

  constructor(private fb: FormBuilder, private ref: DynamicDialogRef, private config: DynamicDialogConfig) {}

  ngOnInit() {
    this.curso = this.config.data.entity;
    this.cursoForm = this.fb.group({
      nombre: [this.curso.nombre, Validators.required],
      descripcion: [this.curso.descripcion, [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      inicio: [this.curso.inicio, Validators.required],
      fin: [this.curso.fin, Validators.required],
      finalizado: [this.curso.finalizado],
      certificadoURL: [this.curso.certificado, Validators.required]
    });

    const hoy = new Date();
    this.maxFechaHoy = hoy.toISOString().split('T')[0];
  }

  onSubmit() {
    if (this.cursoForm.valid) {
      // Aquí puedes manejar la lógica de envío del formulario
    }
  }

  puedeGuardar() {
    return this.cursoForm.valid;
  }
}