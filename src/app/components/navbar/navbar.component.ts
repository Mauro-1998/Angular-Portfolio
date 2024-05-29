import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { NavigationEnd, Router } from '@angular/router';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AboutComponent]
})
export class NavbarComponent implements OnInit {

  iconMenu:boolean = false;

  navbarOptions=[
    {titulo:'Inicio',value:"",selected:true},
    {titulo:'Sobre mi',value:"about",selected:false},
    {titulo:'Resumen',value:"resume",selected:false},
    //{titulo:'Proyectos',value:"projects",selected:false},
    {titulo:'Contacto',value:"contact",selected:false},
    {titulo:'Login',value:"login",selected:false}
  ];

  constructor(private router: Router, private header: HeaderComponent) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects.substr(1); // Elimina el primer '/' de la ruta
        this.updateSelectedMenuItem(currentRoute.toLowerCase());
        this.changeContent(currentRoute.toLowerCase());
      }
    });

    // Al inicializar el componente, actualizar el menú basado en la ruta actual
    const initialRoute = this.router.url.substr(1).toLowerCase();
    this.updateSelectedMenuItem(initialRoute);
    this.changeContent(initialRoute);
  }

  changeIconMenu(){
    this.iconMenu = !this.iconMenu;
  }

  changeSelected(e:{titulo: string, value:string, selected: boolean}){
    this.updateSelectedMenuItem(e.value.toLowerCase());
    this.changeContent(e.value.toLowerCase());
  }

  updateSelectedMenuItem(value: string) {
    for(let object of this.navbarOptions){
      object.selected = (object.value.toLowerCase() === value);
    }
  }

  changeContent(value: string){
    this.header.content = value !== "";
  }
}
