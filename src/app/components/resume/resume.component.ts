import { Component, OnInit } from '@angular/core';
import { ResumeService } from 'src/app/service/resume.service';
import { EstudioService } from 'src/app/service/estudio.service';

import { timer } from 'rxjs';
import { ResponseDTO } from 'src/app/dto/resumen/responseDTO';
import { Carrera } from 'src/app/dto/resumen/carrera';
import { Experiencia } from 'src/app/dto/resumen/experiencia';
import { Curso } from 'src/app/dto/resumen/curso';
import { CursoService } from 'src/app/service/curso.service';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { AppConfig } from 'src/app/shared/config';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  showClass: boolean = false;
  carreras: Carrera[];
  experiencias: Experiencia[];
  cursos: Curso[];
  private readonly userEmail =  `${AppConfig.user}`;
  

  constructor(private resumeService: ResumeService, private estudioService: EstudioService, private cursoService: CursoService, private experienciaService: ExperienciaService) { 
    this.resumeService.getResume(this.userEmail).subscribe((response: ResponseDTO): void => {
      if (response) {
        this.carreras = response.carreras;
        this.experiencias = response.experiencias;
        this.cursos = response.cursos;
      }
    });

    this.estudioService.resumeChanges$.subscribe(() => {
      this.loadResume();
    });

    this.cursoService.cursoChanges$.subscribe(() => {
      this.loadResume();
    });

    this.experienciaService.experienciaChanges$.subscribe(() => {
      this.loadResume();
    });
  }

  ngOnInit(): void {
    const delay = timer(100);
    delay.subscribe(() => {
      this.showClass = true;
    });
  }

  private loadResume() {
    this.resumeService.getResume(this.userEmail).subscribe((response: ResponseDTO): void => {
      if (response) {
        this.carreras = response.carreras;
        this.experiencias = response.experiencias;
        this.cursos = response.cursos;
      }
    });
  }
}
