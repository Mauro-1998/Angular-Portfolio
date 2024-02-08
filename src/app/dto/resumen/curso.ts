export class Curso {

    nombre: String;
    descripcion: String;
    inicio: Date;
    fin?: Date;
    finalizado: Boolean;
    certificado: String;
    id?: number;


    constructor(nombre: String, finalizado:Boolean, certificado:String, inicio: Date, fin: Date, descripcion:String, actual:Boolean, puesto:String, id?:number) {
        this.descripcion = descripcion;
        this.inicio = inicio;
        this.fin = fin;
        this.certificado = certificado;
        this.finalizado = finalizado;
        this.nombre = nombre;
        this.id = id;
    }
   
}