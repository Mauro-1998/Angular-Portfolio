import { Component, OnInit } from '@angular/core';
import {timer} from "rxjs";
import { Carrera } from 'src/app/dto/resumen/carrera';
import { Experiencia } from 'src/app/dto/resumen/experiencia';
import { ResponseDTO } from 'src/app/dto/resumen/responseDTO';
import { ResumeService } from 'src/app/service/resume.service';


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  showClass:boolean = false;

  carreras: Carrera[];

  experiencias: Experiencia[];

  constructor(private service: ResumeService) { 
    this.service.getResume().subscribe((response: ResponseDTO) => {
      if (response) {
        this.carreras = response.carreras;
        this.experiencias = response.experiencias;
        console.log("CARRERAS RESUME COMPONENT: " + JSON.stringify(this.carreras))
        console.log("EXPERIENCIAS RESUME COMPONENT: " + JSON.stringify(this.experiencias))
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
