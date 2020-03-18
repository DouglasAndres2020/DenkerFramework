/*  Denker 1.1 ©2020
           Collapsibles
========================================================================== */

//elemento padre del boton para ejecutar el collapsible
var colap = document.querySelectorAll('.collapsible');

//cantidad de elementos padre del boton
var colapting = colap.length;


//method DataTemplatesStingGeneratorElements

function DCOLAP(title,classes,content){
     return `
         <button class="colapse ${classes}">${title}</button>
         <div class="panel">
         <p>
             ${content}
         </p>
         </div>
     `
}

//executing method DataTemplatesStingGeneratorElements
function DColap() {
     for(let i = 0; i < colapting; i++){
         let title = colap[i].dataset.seccion;  
         let classes = colap[i].dataset.classe;  
         let content = colap[i].innerHTML;
         colap[i].innerHTML = DCOLAP(title,classes,content);
         colap[i].removeAttribute("data-seccion");
         colap[i].removeAttribute("data-classe");
}}DColap();

//boton que ejecuta el open/close de los collapsibles.

 let acc = document.getElementsByClassName("colapse");
 for (let i = 0; i < acc.length; i++) {
 acc[i].addEventListener("click", function() {
     //detecta si el elemento padre del boton tiene el atributo data-pop.
     //si es true se ejecutara como popupt.

     let pop = this.parentNode.dataset.pop;
     if(pop == "true"){
         //si el elemento padre del boton tiene la clase pop.

         if(acc[i].parentNode.classList.contains('pop')){
             //le quita la clase "pop" al elemento padre de el boton.

             this.parentNode.classList.remove('pop')
         }else{//si no tiene el elemento padre del boton no tiene la clase "pop".
            //encuentra todos los elementos con la clase ".colapse".

             let ecoo = document.querySelectorAll(".colapse");
             for (let e = 0; e < ecoo.length; e++) {
                 /*y solo si estan dentro del mismo elemento padre de cerraran los demas
                   y se abrira el elemento en el que se alla precionado. */

                 if(acc[i].parentNode.parentNode == ecoo[e].parentNode.parentNode){
                    /*la variable panel se encarga de detectar el siguiente elemento del dom
                    que no sea un hijo del boton que se encarga de ejecutar el collapsible en
                    el que se alla clickeado. */

                    var panel = ecoo[e].nextElementSibling;
                    panel.style.maxHeight = null;//oculta el contenido del collapsible
                    ecoo[e].classList.remove('active');//y de los demas collapsibles
                    ecoo[e].parentNode.classList.remove('pop')//que esten dentro
                    acc[i].parentNode.classList.remove('pop')//del mismo elemento
                    acc[i].parentNode.classList.add('pop');//padre.
                 }
             }
         }
     }
     /*si el elemento padre en vez de tener como atributo data-pop="true" tiene 
     Acordion o acordion o false o False se ejecutara el collapsible se 
     ejecutara como como un acordion => solo se abrira en el que se alla echo click
     ,los demas se cerraran si estan en el mismo elemento padre.*/

     if(pop === "Acordion" || pop === "acordion" || pop === "false" || pop === "False"){
         /*detecta si el elemento padre del boton tiene la clase ".active". */

         if(acc[i].parentNode.classList.contains('active')){
             //de tenerla se la quitara.
             this.parentNode.classList.remove('active')
             /*Por si hay un error y este elemento tiene la clase ".pop"se la quitara.*/
             this.parentNode.classList.remove('pop')
         }else{//si no tiene la clase ".active" se la agregara.

             let ecoo = document.querySelectorAll(".colapse");
             /* el for se encarga de recoger todos los elementos con la clase '.colapse'
             como estamso usando un queryselectorall esto devuelve un nodo con todos esos
             elementos por eso es necesario hacerlo asi*/

             for (let e = 0; e < ecoo.length; e++) {
                 /*y solo si estan dentro del mismo elemento padre de cerraran los demas
                   y se abrira el elemento en el que se alla precionado. */

                if(acc[i].parentNode.parentNode == ecoo[e].parentNode.parentNode){
                    /*y solo si estan dentro del mismo elemento padre de cerraran los demas
                      y se abrira el elemento en el que se alla precionado. */

                    var panel = ecoo[e].nextElementSibling;
                    panel.style.maxHeight = null;//oculta el contenido del collapsible.
                    ecoo[e].classList.remove('active');//y de los demas collapsibles
                    ecoo[e].parentNode.classList.remove('active')//que esten dentro
                    acc[i].parentNode.classList.remove('active')//del mismo elemento
                    ecoo[e].parentNode.classList.remove('pop')//padre del elemento
                    acc[i].parentNode.classList.remove('pop')//padre.
                    acc[i].parentNode.classList.add('active');
                }
             }
         }
     }
     /*si  el collapsible no es poput ni acordion
        autoamticamente sera de tipo expanded =>
        todos los collapsibles de tipo expanded se podran
        abrir a la vez. */
     var panel = this.nextElementSibling;
     if (panel.style.maxHeight) {
         panel.style.maxHeight = null;
     } else {
         panel.style.maxHeight = panel.scrollHeight + "px";
     }
 });
 };
/* funcion para cerrar los collapsibles
    usando una funcion si en la funcion se especifica como parametro
    "all" se cerraran todos los collapsibles sin exepcion alguna,
    si se especifica un numero se cerrara el collapsible que tenga internamente
    ese numero; para saber que numero poner para que no se cierre un collapsible que
    no quieres debes contar empezando desde 0 la cantidad de collapsible hasta llegar al que quieres
    cerrar, y ese es el numero que deberas colocar para cerrar uno en especifico
*/
function closeCollapsibles(veralonetogether = "all"){
    if(veralonetogether == "all"){
        let ecoo = document.querySelectorAll(".colapse");
        for (let i = 0; i < acc.length; i++) {
           for (let e = 0; e < ecoo.length; e++) {
               var panel = ecoo[e].nextElementSibling;
               panel.style.maxHeight = null;
               ecoo[e].classList.remove('active');
               ecoo[e].parentNode.classList.remove('pop')
               acc[i].parentNode.classList.remove('pop')
               acc[i].parentNode.classList.remove('pop');
           }
       }
    }else {
        let ecoo = document.querySelectorAll(".colapse");
        var panel = ecoo[veralonetogether].nextElementSibling;
        panel.style.maxHeight = null;
        ecoo[veralonetogether].classList.remove('active');
        acc[veralonetogether].parentNode.classList.remove('pop')
        acc[veralonetogether].parentNode.classList.remove('pop');
    }
};
//variable que recoge cuantos elementos elementos padres del boton tienen la clase ".active"
var sc = document.querySelectorAll('.collapsible.active');
//function que detecta cuantos elementos padre del boton tienen la clase ".active"
for(let n = 0; n < sc.length; n++){
	//busca el child con la clase ".colapse" dentro del padre del boton
	let kuy = sc[n].querySelectorAll('.colapse')[0];
	//activa el collapsible
	 var panel = kuy.nextElementSibling;
    panel.style.maxHeight = panel.scrollHeight + "px";
	//si el elemento padre del boton tiene el atributo data-pop="true"
	//entonces se le agregara la clase ".pop" al elemento padre
	let k = kuy.parentNode.dataset.pop;
	if(k == "true"){
		sc[n].classList.add('pop')
		
	}
}
/*
    Collapsibles version 1.6
 */