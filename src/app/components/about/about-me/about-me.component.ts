import { Component, Input, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/dto/about/userDTO';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  
  @Input() aboutMe: UserDTO;

  constructor() { 
  }

  ngOnInit(): void {
    //console.log("REFERENCIAS - AboutMeComponent: " + JSON.stringify(this.aboutMe))
  }


}
