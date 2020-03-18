/*  Denker 1.1 ©2020
           DroopDowns
========================================================================== */

//method DataTemplatesStingGeneratorElements
    var drowing = document.querySelectorAll('.droopdowns.convert');
    var dropding = drowing.length;
    function DDDDrop(title,titbg,drop,dropbg){
      return `
      <div class="bdn droopbtn ${titbg}">${title}</div>
      <div class="droopdown-content ${dropbg}">
          ${drop}
      </div>
      `
    }
    function DDDropp() {
      for(var i = 0; i < dropding; i++){
              let title  = drowing[i].dataset.dropTitle;
              let titbg  = drowing[i].dataset.dropTbg;
              let drop   = drowing[i].innerHTML;
              let dropbg = drowing[i].dataset.dropbg;
              drowing[i].classList.remove('convert');
              drowing[i].innerHTML = DDDDrop(title,titbg,drop,dropbg);
      }
    }DDDropp()
//elemento padre de los droopdowns
    const drop_container = document.querySelectorAll('.droopdowns');
    //elemento donde estan los items del droopdown
    const drop = document.querySelectorAll('.droopdown-content')
    //cantidad de elemento donde estan los items del droopdown
    const drooping = drop.length;
    //boton que que ejecuta la funcion para que Aparesca/Desaparesca el droopdown
    const bot = document.querySelectorAll('.droopbtn');

    for (let i = 0; i < drooping; i++) {
      let height = drop_container[i].offsetHeight;
      let position = drop_container[i].dataset.drop;
      let m = 5;
      //comprobaciones para saber en que posicion aparecera el droopdown

      if (position == "top"){
        drop[i].style.bottom =`${height}px`;
        drop[i].style.left =`${m}px`;
        drop[i].classList.add('top')
      }else if (position == "top-right"){
        drop[i].style.bottom =`${height}px`;
        drop[i].style.right =`${m}px`;
        drop[i].classList.add('top-right')
      }
      else if (position == "bottom-right"){
        drop[i].style.top =`${height}px`;
        drop[i].style.right =`${m}px`;
        drop[i].classList.add('bottom-right')
      }
  bot[i].addEventListener('click',function (){
    if(bot[i].nextElementSibling.classList.contains('shower')){
      //si no tiene la clase para mostrar el droopdown
      bot[i].nextElementSibling.classList.add('exit');
      //cantidad de tiempo que tarda la animacion de salida
      setTimeout(function (){
        bot[i].nextElementSibling.classList.remove('exit')
        bot[i].nextElementSibling.classList.remove('shower')
      },500)
    }else {
      //si si tiene la clase para mostrar el droopdown
      bot[i].nextElementSibling.classList.remove('exit')
      bot[i].nextElementSibling.classList.add('shower')
    }
  })
}

