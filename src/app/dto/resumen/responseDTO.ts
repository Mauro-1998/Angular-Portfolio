import { Carrera } from "./carrera";
import { Curso } from "./curso";
import { Experiencia } from "./experiencia";


export class ResponseDTO {
    
    carreras: Carrera[];
    experiencias: Experiencia[];
    cursos: Curso[];
    
    constructor(referencias: Experiencia[], carreras: Carrera[], cursos: Curso[]){
        this.carreras = carreras;
        this.experiencias = referencias;
        this.cursos = cursos
    }
}