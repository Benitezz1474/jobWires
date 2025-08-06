
export const sendHTTPrequest =async(url,options)=>{ //mando los datos al server (en fomrato TEXTO!)

    
    const res = await fetch(url,options);
    const data = await res.text();
    //pintar y quitar spinner
    console.log("lo que devuelve la BBDD:")
    console.log(data)
    return data
}


export const printHTTPrequest=async(data_res,href)=>{

    const message = document.querySelector(".message"); //en esto voy a pintar los errores
    message.style.display="block";//lo hagovisible por si puede haber algun error
    
    const {data,rol} = await data_res;
    // const data = await sendHTTPrequest(url,options); //obtengo los datos del servidor


    if(data == "success") {
        alert("operando...");
        const email = document.getElementById("email");//obtengo el email para crear una sesion
        sessionStorage.setItem("email",email.value);
        message.style.display="none"; //lo quito para que "no moleste"
        window.location.href = href; //si todo es true entonces lo manda a esta url pasada por parametro 
        
    }

    else if(data == "error") message.innerHTML = "<h4>ERROR AL CONECTAR CON LA BASE DE DATOS</h4>"; //si algo sale mal se pinta este mensaje
    
    else if(data == "user_exist") message.innerHTML = "<h4>EL USUARIO YA EXISTE<h4>";

    else if (data == "incorrect") message.innerHTML = "<h5>USUARIOS Y/O CONTRASEÑA INCORRECTO!</h5>";

    else if(data == "no_found") message.innerHTML = "<h4>NO se encontraron resultados</h4>"

    else message.innerHTML = `<p>Algo salio mal, verifique los campos y su conexion</p>`;

}



