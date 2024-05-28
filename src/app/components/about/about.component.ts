import { Component, OnInit } from '@angular/core';
import { timer } from "rxjs";
import { Referencias } from 'src/app/dto/about/referencias';
import { ResponseDTO } from 'src/app/dto/about/responseDTO';
import { UserDTO } from 'src/app/dto/about/userDTO';
import { AboutService } from 'src/app/service/about.service';
import { TestimonialService } from 'src/app/service/testimonial.service';
import { AppConfig } from 'src/app/shared/config';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  showClass: boolean = false;
  user: ResponseDTO;
  aboutMe: UserDTO;
  referencias: Referencias[] = [];
  private readonly userEmail =  `${AppConfig.user}`;

  constructor(
    private aboutService: AboutService,
    private testimonialService: TestimonialService // Inyectar TestimonialService
  ) {
    
    this.loadUserData(this.userEmail);

    // Suscribirse a los cambios en TestimonialService
    this.testimonialService.referenciaChanges$.subscribe(() => {
      this.loadUserData(this.userEmail);
    });
  }

  ngOnInit(): void {
    const delay = timer(300);
    delay.subscribe(() => {
      this.showClass = true;
    });
  }

  private loadUserData(email: string): void {
    this.aboutService.getUser(email).subscribe(response => {
      if (response != null) {
        this.user = response;
        this.aboutMe = new UserDTO(
          this.user.userDTO.nombre,
          this.user.userDTO.apellido,
          this.user.userDTO.descripcion,
          this.user.userDTO.nacimiento,
          this.user.userDTO.telefono,
          this.user.userDTO.email,
          this.user.userDTO.domicilio,
          this.user.userDTO.urlFoto
        );
        this.referencias = response.referencias;
      }
    });
  }
}
