import { Component, Input, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/dto/resumen/experiencia';
import { ModalService } from 'src/app/service/modal.service';
import { ResumeService } from 'src/app/service/resume.service';
import { TokenInterceptorService } from 'src/app/service/token-interceptor.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  @Input() experiencias: Experiencia[];

  list: String[];

  isHovered: boolean = false;

  isLoginOK: boolean = false;

  componentType: 'experience' = 'experience';
  
  
  constructor(private tokenInterceptorService: TokenInterceptorService) {
    
  }

  ngOnInit(): void {
    if (this.tokenInterceptorService.hasToken() && this.tokenInterceptorService.isTokenValid) {
      this.isLoginOK = true;
    } 
  }

  
}
