import {sendHTTPrequest} from "../../../loginAndRegister.js";

const form = document.getElementById("formToPublic");
const message = document.getElementById("message");

form.addEventListener("submit",async(e)=>{ //funcion para publicar oferta
     
    e.preventDefault(); //evita que se mande el form por defecto
    
    //obtener las variables
    const formData = new FormData(form)

    const title = formData.get("title");
    const price = formData.get("price");
    const description = formData.get("description");
    const ubication = formData.get("ubication");

    //validar las variables del fomr (MAS ADELANTE);


    //enviar al servr
    const data = {
        title,
        price,
        description,
        ubication
    }

    //opciones para enviar al server
    const options = {
        method : "POST",
        header: {"content-type" : "application/json"},
        body : JSON.stringify(data)
    }

    const response = await sendHTTPrequest("publicar.php",options);
    const jsonResponse = JSON.parse(response)
    console.log(response);
    //valido
    if(jsonResponse== "success") message.innerHTML = "Servicio Publicado Correctamente!";

    //esto hay que corregir despues :/
    // else if(jsonResponse== "user_exist") message.innerHTML = "Algo salió mal, intenta nuevamente!";

    else message. innerHTML = "Error FATAL al conectar con la BBDD :(";

})