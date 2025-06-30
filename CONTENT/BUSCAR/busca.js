import {sessionVerify} from "../../sessionVerify.js";
import {printHTTPrequest,sendHTTPrequest,printHTTPrequestOfertas} from "../../loginAndRegister.js";
sessionVerify();

const oferta = document.getElementById("oferta");

const form = document.getElementById("formSearch");

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const fromData = new FormData(form);

    //obtener los filtros del formulario
    const title = fromData.get("title");

    //si todo sale bien llamo a "getOfertas()"
    getOfertas(title);
    
})

const getOfertas=async(oferta)=>{


    const dataSend = {
            title : oferta
    }

    const options = {
        method : "POST",
        headers: {"Content-type": "application/json"},
        body : JSON.stringify(dataSend)
    }
    const data = await sendHTTPrequest("busca.php",options);
    
    printHTTPrequestOfertas(data);
}

// getOfertas();