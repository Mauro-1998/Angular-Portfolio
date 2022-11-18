import { Component, Input, OnInit } from '@angular/core';
import { Carrera } from 'src/app/dto/resumen/carrera';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  @Input() carrera: Carrera[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
