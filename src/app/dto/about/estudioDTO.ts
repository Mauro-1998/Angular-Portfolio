export interface EstudioDTO {
    id?: number;
    nombre: string;
    facultad: string;
    descripcion: string;
    inicio: Date;
    fin?: Date;
    finalizado: boolean;
    idPersona?: number;
  }
  