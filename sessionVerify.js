export const sessionVerify=(url)=>{
    
const CI = document.getElementById("CI");
if(sessionStorage.getItem("CI")) window.location.href = url;
}