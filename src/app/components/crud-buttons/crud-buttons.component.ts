import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-crud-buttons',
  templateUrl: './crud-buttons.component.html',
  styleUrls: ['./crud-buttons.component.css']
})
export class CrudButtonsComponent implements OnInit {

  @Input() isHovered: boolean = false;
  @Input() isLoginOK: boolean = false;
  @Input() showAddButton: boolean = true;
  @Input() showEditButton: boolean = true;
  @Input() showDeleteButton: boolean = true;


  

  buttonStyles = {
    base: {
      'background-color': 'transparent',
      'border': '2px solid transparent', // Borde transparente en el estado base
      'color': '#fff'
    },
    hover: {
      'background-color': '#35e888',
      'border-color': '#35e888' // Borde del mismo color que el fondo al pasar el ratón
    },
    active: {
      'background-color': '#35e888',
      'border-color': '#35e888' // Borde del mismo color que el fondo al hacer clic
    },
    disabled: {
      'background-color': 'transparent',
      'color': '#ccc',
      'border-color': 'transparent' // Borde transparente en estado deshabilitado
    },
    delete: {
      'background-color': 'transparent',
      'border': '2px solid transparent',
      'color': '#fff'
    },
    deleteHover: {
      'background-color': 'red',
      'border-color': 'red'
    },
  
    edit: {
      'background-color': 'transparent',
      'border': '2px solid transparent',
      'color': '#fff'
    },
    editHover: {
      'background-color': 'yellow',
      'border-color': 'yellow'
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

  hoverButtonColor() {
    this.isHovered = true;
  }

  resetButtonColor() {
    this.isHovered = false;
  }

}