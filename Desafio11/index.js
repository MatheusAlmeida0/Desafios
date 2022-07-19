const senha = document.getElementById("senha")
const ImgOlho = document.getElementById("olho-senha")

function clickOlho(){
  let TipodaSenha = senha.type == "password"

  if(TipodaSenha){
    mostreSenha()
  }else{
    esconderSenha()
  }
}

function mostreSenha(){
  senha.setAttribute("type", "text")
  ImgOlho.setAttribute("src", "assets/eye-off-outline.svg")
}

function esconderSenha(){
  senha.setAttribute("type", "password")
  ImgOlho.setAttribute("src", "assets/eye-outline.svg" )
}