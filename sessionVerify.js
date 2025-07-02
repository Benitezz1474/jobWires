export const sessionVerify=()=>{ //verifica que exista una sesion con cedula

    const url_registro = "http://localhost/PROYECTO/REGISTRO/index.html";
    const url_login = "http://localhost/PROYECTO/LOGIN/index.html";
    const url_actually = window.location.href;
// const url_finally = "http://localhost/PROYECTO/CONTENT/index.html";

//si no existe la sesion debe registrarse: lo madno a que se registre
if(!(sessionStorage.getItem("email")) && (url_actually != url_registro  && url_actually != url_login)){
    
    // window.location.href = url_registro; //lo mando al registro
}

//si no tiene sesion PERO se encuentra en el login o registro no pasa nada, no lo mando a ningun lado
else if (!(sessionStorage.getItem("email")) && 
(url_actually == url_registro) || url_actually == url_login){
    
    console.log("debe registrarse"); //deberia informarle que debe registrarse para continuar
}


}
