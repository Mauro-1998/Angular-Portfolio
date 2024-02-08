export class Experiencia {
    id?: number;
    empresa: string;
    puesto: string;
    descripcion: string;
    inicio: Date;
    fin: Date;
    actual: boolean;

    constructor(empresa: string, inicio: Date, fin: Date, descripcion: string, actual: boolean, puesto: string, id?: number) {
        this.id = id;
        this.empresa = empresa;
        this.inicio = inicio;
        this.fin = fin;
        this.descripcion = descripcion;
        this.actual = actual;
        this.puesto = puesto;
    }
}
