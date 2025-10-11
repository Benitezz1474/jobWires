import {sendHTTPrequest} from "../../../loginAndRegister.js";

const getParams=(string)=>{//obtengo los parametros de la URL
    
    const params = new URLSearchParams(window.location.search);
    return params.get(string);

}

//obtengo el form y el submit del form
const formSMS = document.getElementById("formSMS");
// const button_sendMessage = document.getElementById("sendSMS")


formSMS.addEventListener("submit",async(e)=>{//esta funcion envia el mensaje a apache y lo trabajon con PHP desde ahí
    
    e.preventDefault();
    
    //agarro el input (el mensjae, texto)
    const formData = new FormData(formSMS);
    const message = formData.get("message");

    const data = {
        message,
        CiCliente : getParams("CiCliente"), //no haría falta porque la tengo en la session PEEERO por si las dudas :)
        CiProveedor : getParams("CiProveedor"),
        IdServicio : getParams("IdService")
    }

    const options = {
        method : "POST",
        headers : {"content-type" : "application/json"},
        body : JSON.stringify(data)
    }

    const res = await sendHTTPrequest("./sendSMS.php",options);
    const result = document.querySelector(".result");
    result.innerHTML="Mensaje Enviado Correctamente!";
    

})




