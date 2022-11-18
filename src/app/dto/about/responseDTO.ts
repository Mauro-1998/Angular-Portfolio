import { Referencias } from "./referencias";
import { UserDTO } from "./userDTO";

export class ResponseDTO {
    
    userDTO: UserDTO;
    referencias: Referencias[];
    
    constructor(referencias: Referencias[], userDTO: UserDTO){
        this.userDTO = userDTO;
        this.referencias = referencias;
        //console.log(JSON.stringify(userDTO));
        //console.log(JSON.stringify(referencias));
    }

    getUserDTO(){
        return this.userDTO;
    }

    getReferencias(){
        return this.referencias;
    }
}