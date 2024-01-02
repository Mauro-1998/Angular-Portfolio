export class Curso {
    /*
    "nombre": "Prueba editar 2",
    "descripcion": "Holis",
    "inicio": "2023-06-01",
    "fin": "2030-06-02",
    "finalizado": false,
    "certificadoURL": "https://drive.google.com/file/d/1CSqdHC8FqOeOb6k-UbdXsdNRPDKVKKMr/view"
    */

    nombre: String;
    descripcion: String;
    inicio: Date;
    fin?: Date;
    finalizado: Boolean;
    certificado: String;


    constructor(nombre: String, finalizado:Boolean, certificado:String, inicio: Date, fin: Date, descripcion:String, actual:Boolean, puesto:String) {
        this.descripcion = descripcion;
        this.inicio = inicio;
        this.fin = fin;
        this.certificado = certificado;
        this.finalizado = finalizado;
        this.nombre = nombre;
    }
   
}