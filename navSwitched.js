const nav = document.querySelector(".nav-links");
const btn_nav = document.getElementById("btn_nav");

btn_nav.addEventListener("click",()=>{

    nav.classList.toggle("nav-links-toggle");
})
