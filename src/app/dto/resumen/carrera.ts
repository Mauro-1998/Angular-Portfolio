export class Carrera {
    id?: number;
    nombre: string;
    facultad: string;
    inicio: Date;
    fin: Date;
    finalizado: boolean;
    descripcion: string;

    constructor(nombre: string, facultad: string, inicio: Date, fin: Date, descripcion: string, finalizado: boolean, id?: number) {
        this.id = id;
        this.nombre = nombre;
        this.facultad = facultad;
        this.inicio = inicio;
        this.fin = fin;
        this.finalizado = finalizado;
        this.descripcion = descripcion;
    }
}
