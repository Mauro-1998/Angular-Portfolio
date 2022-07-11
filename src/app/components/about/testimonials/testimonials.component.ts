import {Component, Input, OnInit} from '@angular/core';
import {timer} from "rxjs";
import {Testimonial} from "./testimonial";
import {TestimonialService} from "./testimonial.service";

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})


export class TestimonialsComponent implements OnInit {


  childs: Testimonial[];

  responsiveOptions;


  constructor(private testimonialService: TestimonialService) {
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
    this.childs = this.testimonialService.createTestimonials();
    console.log(this.childs)
  }
}
