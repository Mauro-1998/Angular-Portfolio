import { Carrera } from "./carrera";
import { Experiencia } from "./experiencia";


export class ResponseDTO {
    
    carreras: Carrera[];
    experiencias: Experiencia[];
    
    constructor(referencias: Experiencia[], carreras: Carrera[]){
        this.carreras = carreras;
        this.experiencias = referencias;
    }
}