export class Carrera {

    carrera:String;
    facultad:String;
    inicio: Date;
    fin: Date;
    finalizado: Boolean;
    descripcion: String;
    

    constructor(carrera: String, facultad: String, inicio: Date, fin: Date, descripcion:String, finalizado:Boolean) {
        this.carrera = carrera;
        this.facultad = facultad;
        this.inicio = inicio;
        this.fin = fin;
        this.finalizado = finalizado;
        this.descripcion = descripcion;
    }
}

