import { Component, OnInit } from '@angular/core';
import {timer} from "rxjs";

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  showClass:boolean = false;

  constructor() { }

  ngOnInit(): void {
    const delay = timer(100);

    delay.subscribe(() => {
      this.showClass = true;
    });
  }

}
