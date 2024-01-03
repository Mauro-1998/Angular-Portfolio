
import { Component, Input, OnInit } from '@angular/core';
import { Referencias } from 'src/app/dto/about/referencias';
import { TokenInterceptorService } from 'src/app/service/token-interceptor.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {

  isHovered: boolean = false;

  isLoginOK: boolean = false;

  @Input() testimonials: Referencias[];

  componentType: 'testimonials' = 'testimonials';

  responsiveOptions;

  constructor(private tokenInterceptorService: TokenInterceptorService) {
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
    // Realizar una solicitud HTTP para verificar la existencia del token
    if (this.tokenInterceptorService.hasToken() && this.tokenInterceptorService.isTokenValid) {
      this.isLoginOK = true;
    } else {
      console.log('No hay token disponible. No se carga el componente.');
    }
  }

  hoverButtonColor() {
    this.isHovered = true;
  }

  resetButtonColor() {
    this.isHovered = false;
  }
}
