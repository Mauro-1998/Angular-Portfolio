export class Referencias {
    id?: number;
    descripcion:String;
    nombre:String;
    urlFoto:String;
    puesto:String;

    constructor(content:String,author:String,imageURL:String,position:String,id?: number){
        this.id = id;
        this.descripcion = content;
        this.nombre = author;
        this.urlFoto = imageURL;
        this.puesto = position;
    }
}