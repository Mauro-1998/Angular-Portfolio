import {Component, OnInit, } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {AboutComponent} from "../about/about.component";

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
  ]

  constructor(private header:HeaderComponent) { }

  ngOnInit(): void {
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
    console.log("value: " + value)
    if(value !== ""){
      this.header.content = true
    }else{
      this.header.content = false
    }
  }



}
