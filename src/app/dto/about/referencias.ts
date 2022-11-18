export class Referencias {
    
    descripcion:String;
    nombre:String;
    urlFoto:String;
    puesto:String;

    constructor(content:String,author:String,imageURL:String,position:String){
        this.descripcion = content;
        this.nombre = author;
        this.urlFoto = imageURL;
        console.log(this.nombre +": " + this.urlFoto )
        this.puesto = position;
    }
}