//solo debe traer los comentarios
import {sendHTTPrequest} from "../../../loginAndRegister.js";

//funcion que pinta los comentarios
const printComents=async(coments=[])=>{
    
    const comentsBBDD_DOM = document.getElementById("comentsBBDD");

    comentsBBDD_DOM.innerHTML = "";

    coments.forEach(item => {

        comentsBBDD_DOM.innerHTML += `
          <li>${item.comentarios}</li>
        `;
    })

}

const getComents=async()=>{

    const options = {
        method : "POST",
        headers : {"content-type" : "application/json"},
        body : JSON.stringify({status : "ok"})
}
    
//prepara y envia la consulta
const coments = await sendHTTPrequest("./comentarios.php",options);
printComents(coments);
}

getComents();
