import { Component, Input, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/dto/resumen/experiencia';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  @Input() experiencias: Experiencia[];

  list: String[];
  

  constructor() {
    
  }


  ngOnInit(): void {
    console.log("EXPERIENCIAS: " + JSON.stringify(this.experiencias))
  }


  

}
