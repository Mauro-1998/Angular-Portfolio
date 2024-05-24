export class Referencias {
    id?: number;
    descripcion:String;
    nombre:String;
    fotoURL:String;
    puesto:String;

    constructor(content:String,author:String,imageURL:String,position:String,id?: number){
        this.id = id;
        this.descripcion = content;
        this.nombre = author;
        this.fotoURL = imageURL;
        this.puesto = position;
    }
}