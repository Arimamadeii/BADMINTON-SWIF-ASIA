const match=document.querySelector(".match");

const popup=document.getElementById("popup");

if(match){

match.onclick=()=>{

popup.style.display="flex";

}

}

function closePopup(){

popup.style.display="none";

}
