
export class UserDTO{
    
    id?:number;
    nombre: String;
    apellido: String;
    nacimiento: Date;
    descripcion: String;
    domicilio: String;
    email: String;
    telefono: String;
    urlFoto:String;
    edad:Number;
    


    constructor(nombre:String,apellido:String,descripcion:String,nacimiento:Date,telefono:String, email:String, domicilio:String, urlFoto:String, id?:number){
        this.nombre = nombre;
        this.apellido = apellido;
        this.descripcion = descripcion;
        this.nacimiento = nacimiento;
        this.telefono = telefono;
        this.email = email;
        this.domicilio = domicilio;
        this.urlFoto = urlFoto;
        this.edad = this.CalculateAge(nacimiento);
        this.id = id;
        //console.log("EDAD: " + this.edad)
    }

    
    CalculateAge(nac:Date): Number {
        if (nac != null) {
            let timeDiff = Math.abs(Date.now() - new Date(nac).getTime());
            return Math.ceil((timeDiff / (1000 * 3600 * 24)) / 365)-1;
        } else {
            return 0;
        }
    }
   
}