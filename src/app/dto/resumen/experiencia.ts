export class Experiencia {

    empresa: String;
    puesto: String;
    descripcion: String;
    inicio: Date;
    fin: Date;
    actual: Boolean;

    constructor(empresa: String, inicio: Date, fin: Date, descripcion:String, actual:Boolean, puesto:String) {
        this.descripcion = descripcion;
        this.inicio = inicio;
        this.fin = fin;
        this.empresa = empresa;
        this.actual = actual;
        this.puesto = puesto;
    }
   
}