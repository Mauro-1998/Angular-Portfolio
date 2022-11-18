import {Component, Input, OnInit} from '@angular/core';
import { Referencias } from 'src/app/dto/about/referencias';




@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})


export class TestimonialsComponent implements OnInit {

  
  @Input() testimonials: Referencias[];
  

  responsiveOptions;


  constructor() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '992px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    //console.log("REFERENCIAS - TestimonialComponent: " + JSON.stringify(this.testimonials))
  }
}