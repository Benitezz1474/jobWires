import {sendHTTPrequest} from "../../../loginAndRegister.js";

export const delteService=async(id)=>{

    //esta funcion debe hacer TODO:
    //1)realizar la peticion a la BBDD
    //2)eliminar el servicio
    //3)hacer un reloading de la web para aplicar los cambios
    //4)quitar las ventanas de carga (en caso de que se hayan implementado)



    const options = {
        mehod : "POST",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify({id : id})
    }
    const result = sendHTTPrequest("./deleteService.php",options);
    
}