export const loginhander =(user)=>{
    let result = true;
    if( user["email"].match (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
    
{
    const fildNam = document.getElementById("email")
fildNam.classList.add("valide")

}
else {
const fildNam = document.getElementById("email")
fildNam.classList.add("erreur")
result = false;
};

if(user["password"].length!==0)
{
const fildNam = document.getElementById("password")
fildNam.classList.add("valide")
}
else {const fildNam = document.getElementById("password")
fildNam.classList.add("erreur")
result= false;}
return (result);
}
