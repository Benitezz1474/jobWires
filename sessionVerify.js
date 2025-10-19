export const sessionVerify = () => {
    // Obtener el origen dinámicamente (protocolo + dominio/IP + puerto)
    const baseUrl = window.location.origin;
    
   const url_registro = `${baseUrl}/jobWires/REGISTRO/register.html`;
   const url_login = `${baseUrl}/jobWires/LOGIN/login.html`;

    const url_actually = window.location.href;

    // Si no existe la sesión PERO está en login o registro, no hace nada
    if (!(sessionStorage.getItem("email")) && 
        (url_actually === url_registro || url_actually === url_login)) {
        console.log("debe registrarse");
    }
    // Si no tiene sesión Y no está en registro ni login, lo redirige
    else if (!(sessionStorage.getItem("email")) && 
             url_actually !== url_registro && 
             url_actually !== url_login) {
        window.location.href = url_registro;
    }
}
