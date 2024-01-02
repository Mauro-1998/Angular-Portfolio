import { Component, OnInit } from '@angular/core';
import { timer } from "rxjs";
import { Carrera } from 'src/app/dto/resumen/carrera';
import { Curso } from 'src/app/dto/resumen/curso';
import { Experiencia } from 'src/app/dto/resumen/experiencia';
import { ResponseDTO } from 'src/app/dto/resumen/responseDTO';
import { ResumeService } from 'src/app/service/resume.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  showClass: boolean = false;
  carreras: Carrera[];
  experiencias: Experiencia[];
  cursos:Curso[]

  constructor(private service: ResumeService) { 
    const userEmail = 'molinamauro12@gmail.com';  // Reemplaza con el email del usuario actual
    this.service.getResume(userEmail).subscribe((response: ResponseDTO): void => {
      if (response) {
        this.carreras = response.carreras;
        this.experiencias = response.experiencias;
        this.cursos =response.cursos;
      }
    })
  }

  ngOnInit(): void {
    const delay = timer(100);
    delay.subscribe(() => {
      this.showClass = true;
    });
  }
}