import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/service/modal.service';


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

  @Input() id: number; 
  @Input() componentType: 'education' | 'experience' | 'course' | 'testimonials';





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

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  hoverButtonColor() {
    this.isHovered = true;
  }

  resetButtonColor() {
    this.isHovered = false;
  }

  // Agrega la lógica según sea necesario utilizando componentType
  editButtonClick() {
    console.log('Edit Button Clicked:', this.componentType, " ID: " + this.id);
    switch (this.componentType) {
      case 'education':
        this.modalService.openEditModal(this.componentType, this.id);
        break;
      case 'experience':
        this.modalService.openEditModal(this.componentType, this.id);
        // Lógica para la experiencia
        break;
      case 'course':
        this.modalService.openEditModal(this.componentType, this.id);
        // Lógica para el curso
        break;
      case 'testimonials':
        this.modalService.openEditModal(this.componentType, this.id);
        // Lógica para el testimonio
        break;
      default:
        console.log("ERROR: Componente sin definir")
        break;
    }
  }



  // Agrega la lógica según sea necesario utilizando componentType
  addButtonClick() {
    switch (this.componentType) {
      case 'education':
        this.modalService.openAddModal(this.componentType);
        break;
      case 'experience':
        this.modalService.openAddModal(this.componentType);
        // Lógica para la experiencia
        break;
      case 'course':
        this.modalService.openAddModal(this.componentType);
        // Lógica para el curso
        break;
      case 'testimonials':
        this.modalService.openAddModal(this.componentType);
        // Lógica para el curso
        break;
      default:
        console.log("ERROR: Componente sin definir")
        break;
    }
  }



  deleteButtonClick() {
    console.log('Delete Button Clicked:', this.componentType, " ID: " + this.id);
    switch (this.componentType) {
      case 'education':
        this.modalService.openDeleteModal(this.componentType, this.id);
        break;
      case 'experience':
        this.modalService.openDeleteModal(this.componentType, this.id);
        // Lógica para la experiencia
        break;
      case 'course':
        this.modalService.openDeleteModal(this.componentType, this.id);
        // Lógica para el curso
        break;
      case 'testimonials':
        this.modalService.openDeleteModal(this.componentType, this.id);
        // Lógica para el testimonio
        break;
      default:
        console.log("ERROR: Componente sin definir")
        break;
    }
  }



}