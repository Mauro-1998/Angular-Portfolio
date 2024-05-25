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
  @Input() entity: any; // Nueva entrada para la entidad

  @Output() editClicked = new EventEmitter<any>(); // Nuevo evento de salida





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

  editButtonClick() {
    console.log('Edit Button Clicked: ', this.componentType, " entity: " + this.entity);
    this.editClicked.emit(this.entity); // Emitir el evento con la entidad
    this.modalService.openEditModal(this.componentType, this.entity); // Abrir el modal con la entidad
  }

  addButtonClick(){
    console.log('Add Button Clicked from: ', this.componentType);
    this.modalService.openAddModal(this.componentType);
  }


  deleteButtonClick(){
    console.log('Delete Button Clicked from ', this.componentType, " ID: ", this.id);
    this.modalService.openDeleteModal(this.componentType,this.id);
  }

  
}