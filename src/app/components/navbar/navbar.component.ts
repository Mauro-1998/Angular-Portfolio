import {Component, OnInit, } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {AboutComponent} from "../about/about.component";
import { NavigationEnd, Router } from '@angular/router';

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
  ]

  constructor(private router: Router, private header:HeaderComponent) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects.substr(1); // Elimina el primer '/' de la ruta
        this.changeContent(currentRoute.toLowerCase());
      }
    });
  }

  changeIconMenu(){
    this.iconMenu = !this.iconMenu
  }

  changeSelected(e:{titulo: string, value:string, selected: boolean}){
    for(let object of this.navbarOptions){
      if(object.selected){
        object.selected = false;
      }else{
        if(object.titulo === e.titulo){
          object.selected = true;
        }
      }
    }
    this.changeContent(e.value.toLowerCase())
  }

  changeContent(value:string){
    if(value !== ""){
      this.header.content = true
    }else{
      this.header.content = false
    }
  }



}
