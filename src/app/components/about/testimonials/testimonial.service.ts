import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Testimonial } from "./testimonial";


@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  createTestimonials():Testimonial[]{

    const sujeto1: Testimonial = {
      content: "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.",
      author: "Saul Goodman",
      imageURL: "assets/img/testimonials/testimonials-1.jpg",
      position: "Ceo & Founder"
    };
    const sujeto2: Testimonial = {
      content:"Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.",
      author:"Sara Wilsson",
      imageURL:"assets/img/testimonials/testimonials-2.jpg",
      position:"Designer"
    }
    const sujeto3 : Testimonial = {
      content:"Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.",
      author:"Jena Karlis",
      imageURL:"assets/img/testimonials/testimonials-3.jpg",
      position:"Store Owner"
    }

    const sujeto4: Testimonial = {
      content:"Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.",
      author:"Matt Brandon",
      imageURL:"assets/img/testimonials/testimonials-4.jpg",
      position:"Freelancer"
    }

    const sujeto5: Testimonial = {
      content:"Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.",
      author:"John Larson",
      imageURL:"assets/img/testimonials/testimonials-5.jpg",
      position:"Entrepreneur"
    }

    return [sujeto1,sujeto2,sujeto3,sujeto4,sujeto5]
  }




  constructor() { }
}
