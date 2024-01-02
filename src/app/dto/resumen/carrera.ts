export class Carrera {

    nombre:String;
    facultad:String;
    inicio: Date;
    fin: Date;
    finalizado: Boolean;
    descripcion: String;
    

    constructor(nombre: String, facultad: String, inicio: Date, fin: Date, descripcion:String, finalizado:Boolean) {
        this.nombre = nombre;
        this.facultad = facultad;
        this.inicio = inicio;
        this.fin = fin;
        this.finalizado = finalizado;
        this.descripcion = descripcion;
    }
}

