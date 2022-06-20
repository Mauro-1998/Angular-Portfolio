import {AfterContentInit, ChangeDetectorRef, Component, OnInit,} from '@angular/core';
import { timer } from "rxjs";



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})


export class AboutComponent implements OnInit {

  showClass:boolean = false;


  constructor() {
  }

  ngOnInit(): void {
    const delay = timer(700);

    delay.subscribe(() => {
      this.showClass = true;
    });
  }


}
