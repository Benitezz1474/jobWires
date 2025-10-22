const nav = document.querySelector(".nav-links");
const btn_nav = document.getElementById("btn_nav");

btn_nav.addEventListener("click",()=>{

    nav.classList.toggle("nav-links-toggle");
})

// verifico si el usuario tiene sesion activa
const checkUserSession = async () => {
    
    const response = await fetch('./checkSession.php');
    const data = await response.json();
    
    if(data.logged){
        //si esta logueado oculto los botones de registro y login
        document.getElementById('btnRegistro').style.display = 'none';
        document.getElementById('btnLogin').style.display = 'none';
        document.getElementById('btnPerfil').style.display = 'block';
        document.getElementById('btnLogout').style.display = 'block';
        
        //dependiendo del rol lo mando a una pagina u otra
        const perfilLink = document.getElementById('linkPerfil');
        if(data.rol === 'Cliente'){
            perfilLink.href = './CONTENT/CONFIGURACIONES/PERFIL/index.html';
        } 
        else if(data.rol === 'Proveedor'){
            perfilLink.href = './CONTENT_PROVIDER/index.php';
        } 
        else if(data.rol === 'AdminGestion'){
            perfilLink.href = './CONTENT_ADMIN/index.php';
        }
        
    } else{
        //si no esta logueado muestro los botones normales
        document.getElementById('btnRegistro').style.display = 'block';
        document.getElementById('btnLogin').style.display = 'block';
        document.getElementById('btnPerfil').style.display = 'none';
        document.getElementById('btnLogout').style.display = 'none';
    }

};

//cuando cargue la pagina verifico la sesion
checkUserSession();

//manejo el boton de cerrar sesion
const logoutBtn = document.getElementById('logout');
if(logoutBtn){
    logoutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        await fetch('./logout.php');
        window.location.href = './index.html'; //vuelvo al inicio
    });
}