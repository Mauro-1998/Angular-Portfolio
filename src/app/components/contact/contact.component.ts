import { Component, OnInit } from '@angular/core';
import {timer} from "rxjs";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  showClass: boolean = false;

  constructor() { }

  ngOnInit(): void {
    const delay = timer(300);
    delay.subscribe(() => {
      this.showClass = true;
    });
  }

}
