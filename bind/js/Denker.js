
function Denkerize() {
    Toasting()
}

/*  Denker 1.1 ©2020
           percent circular progres
========================================================================== */

function pross(percent,color,skill){
    return `
    <div class="boxx">
    <svg>
    <circle cx="70" cy="70" r="70"></circle>
    <circle cx="70" cy="70" r="70" class="pross" style=" stroke-dashoffset: calc(440 - (440 * 0) / 100);
    stroke:${color};"></circle>
    </svg>
    <div class="number">
        <h2 class="h2"style="color: ${color}">${percent} <span>%</span></h2>
    </div>
    </div>
    <h2 class="text">${skill}</h2>`
}
function pros() {
var progress = document.querySelectorAll('.percent');
var pr = progress.length;
for (let o = 0; o < pr; o++) {
    let datalenght = progress[o].dataset.pross;
    let datacolor = progress[o].dataset.color;
    let dataskill  = progress[o].innerHTML;
    progress[o].innerHTML = pross(datalenght,datacolor,dataskill);
	progress[o].removeAttribute('data-color')
    if(progress[o].dataset.bg){
        if(progress[o].dataset.bg == "dark"){
            let dark = "#242436"
			progress[o].removeAttribute('data-bg')
            progress[o].querySelectorAll('.pross')[0].style.fill = dark;
        }else {
			progress[o].removeAttribute('data-bg')
            progress[o].querySelectorAll('.pross')[0].style.fill = progress[o].dataset.bg;
        }
    }
    setTimeout(() => {
        progress[o].querySelectorAll('.pross')[0].style.strokeDashoffset = `calc(440 - (440 * ${datalenght}) / 100)`
    }, 500);
}
}pros();

function RepeatProggresAnimation(){
	var progress = document.querySelectorAll('.percent');
	var pr = progress.length;
	for (let b = 0; b < pr; b++){
		let datalenght = progress[b].dataset.pross;
		progress[b].querySelectorAll('.pross')[0].style.transition = `all ease .0s`;
		progress[b].querySelectorAll('.pross')[0].style.strokeDashoffset = `calc(440 - (440 * 0) / 100)`;
		setTimeout(() => {
			progress[b].querySelectorAll('.pross')[0].style.transition = `all ease .5s`;
        progress[b].querySelectorAll('.pross')[0].style.strokeDashoffset = `calc(440 - (440 * ${datalenght}) / 100)`
    }, 0);
	}
}

/*  Denker 1.1 ©2020
           cards reveal
========================================================================== */
//boton que abre los reveal
const reveal = document.querySelectorAll('.rax');
//boton que cierra los reveal
const reclose = document.querySelectorAll('.close');
//div donde esta el contenido de los reveal
const rev = document.querySelectorAll('.reveal');
for (let g = 0; g < rev.length; g++) {
    rev[g].style.height = "0%";
    reveal[g].addEventListener('click', function () {
        if(rev[g].dataset.reveal == "sticky"){
            let r = rev[g].nextElementSibling.offsetHeight;
            rev[g].style.height = `calc(100% - ${r}px)`;
            rev[g].style.transform = `translateY(-${r}px)`
            rev[g].style.overflow = "auto";
        }else{
            rev[g].style.height = "100%";
            rev[g].style.overflow = "auto";
        }
    });
    reclose[g].addEventListener('click', function () {
        rev[g].style.height = "0%";
        setTimeout(() => {
            rev[g].style.overflow = "hidden";
        }, 500);
    });
}

const a = document.querySelectorAll('a.disabled');
for (let v = 0; v < a.length; v++) {
    a[v].addEventListener('click',function (e){
        e.preventDefault()
    })
    
}
/*  Denker 1.1 ©2020
           inputs
========================================================================== */
const inputs = document.querySelectorAll(".input");

function addcl(){
	let parent = this.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}

inputs.forEach(input => {
    if(input.getAttribute('disabled') == "disabled" && input.tagName !== "TEXTAREA"){
        input.parentNode.classList.add('disabled')
    }
    if(input.dataset.length !== undefined){

        //generate counter element
        let prex =  input.parentNode.querySelector('.prefix');
        let newCounter = document.createElement('span');
        newCounter.classList.add('counter')
        input.parentNode.insertBefore(newCounter,input);
        //si el input tiene un icon prefix al elemento padre se le agrega la clase ".prefixed"
        if( prex !== null && input.tagName != "TEXTAREA" || prex !== undefined && input.tagName != "TEXTAREA"){
            if(input.parentNode.querySelector('.prefix')){
                input.parentNode.classList.add('prefixed');
            }
        }
        //generate icon error element
        let newError = document.createElement('label');
        let fore = input.getAttribute('id');
        newError.classList.add('error');
        newError.setAttribute('for',`${fore}`)
        newError.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z"/></svg>`
        input.parentNode.insertBefore(newError,input)
            //establece al contador cuantos caracteres tiene el input actual
            let counter = input.parentNode.querySelector('.counter');
            let min = input.value.length;
            let max = input.dataset.length;
            counter.innerHTML = `${min}/${max}`;
            input.parentNode.classList.remove('errored')
            input.parentNode.classList.remove('error')
            input.parentNode.querySelector('.error').style.display = "none";
            counter.classList.remove('angular-text')
    }
    input.addEventListener('keydown',() => {
        if(input.dataset.length){
            let counter = input.parentNode.querySelector('.counter');
            let min = input.value.length;
            let max = input.dataset.length;
            counter.innerHTML = `${min}/${max}`;
            if(min > max){
                input.parentNode.classList.add('error')
                counter.classList.add('angular-text')
                if(input.tagName != "TEXTAREA"){
                    input.parentNode.classList.add('errored')
                    input.parentNode.querySelector('.error').style.display = null
                }
            }else {
                input.parentNode.classList.remove('errored')
                input.parentNode.classList.remove('error')
                input.parentNode.querySelector('.error').style.display = "none";
                counter.classList.remove('angular-text')
            }
        }
    })
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
    input.addEventListener("blur", () => {
        let l = input.value.length;
        if(l === 0 && input.dataset.length != null ){
            let counter = input.parentNode.querySelector('.counter');
            let max = input.dataset.length;
            counter.innerHTML = `0/${max}`;
            input.parentNode.classList.remove('errored')
            input.parentNode.classList.remove('error')
            input.parentNode.querySelector('.error').style.display = "none";
            counter.classList.remove('angular-text')
        }
    });
});
for (let r = 0; r < inputs.length; r++) {
    if(inputs[r].hasAttribute('disabled')){
        inputs[r].classList.add('disabled')
    }
}


var textarea = document.querySelectorAll('textarea.input');
for (let t = 0; t < textarea.length; t++) {
    textarea[t].addEventListener('keydown', autosize);
}
for (let t = 0; t < textarea.length; t++) {
    if(textarea[t].dataset.length){
        let counter = textarea[t].parentNode.querySelector('.counter');
        let min = textarea[t].value.length;
        let max = textarea[t].dataset.length;
        counter.innerHTML = `${min}/${max}`;
    }
}
             
function autosize(){
  var el = this;
  setTimeout(function(){
    el.style.cssText = 'height:auto; padding:0';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
    if(el.dataset.length){
        let counter = el.parentNode.querySelector('.counter');
        let min = el.value.length;
        let max = el.dataset.length;
        counter.innerHTML = `${min}/${max}`;
        if(min > max){
            el.parentNode.classList.add('error')
            counter.classList.add('angular-text')
        }else {
            el.parentNode.classList.remove('error')
            counter.classList.remove('angular-text')
        }
    }
  },0);
}

/*  Denker 1.1 ©2020
           tabs ver 1.0
========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
const tab_parent = document.querySelectorAll('ul.tabs');
const indicators = document.querySelector('.indicator');


for (let y = 0; y < tab_parent.length; y++) {
    let tab = tab_parent[y].querySelectorAll('.uTab');
    let indicator = tab_parent[y].querySelector('.indicator');
    let parent = tab_parent[y];
    
    for (let t = 0; t < tab.length; t++) {
        let op = tab[t].querySelector('a').dataset.href;
        let el = document.querySelector(`#${op}`)
        let hi = el.parentNode.querySelectorAll('div');
        for (let h = 0; h < hi.length; h++) {
            hi[h].style.display = "none";
        }
        tab[t].addEventListener('click', () => {
            let hi = el.parentNode.querySelectorAll('div');
            for (let h = 0; h < hi.length; h++) {
                hi[h].style.display = "none";
            }
            for (let x = 0; x < tab.length; x++) {
                tab[x].classList.remove('active')
            }
            let thisTabWidth = tab[t].getBoundingClientRect().width;
            indicator.style.width = `${thisTabWidth}px`;
            for (let n = 0; n < t+1; n++) {
                indicator.style.transform = null
                for (let e = 0; e < n; e++) {
                    indicator.style.transform += `translatex(${tab[e].offsetWidth}px)`;
                }
            }
            tab[t].classList.add('active')
            el.parentNode.querySelector(`#${op}`).style.display = null;
        })

	}
}
/*  Denker 1.1 ©2020
           preselecting tab
========================================================================== */
for (let g = 0; g < tab_parent.length; g++) {
    let tab = tab_parent[g].querySelectorAll('.uTab');
    let indicator = tab_parent[g].querySelector('.indicator');
    let parent = tab_parent[g];
    for (let a = 0; a < tab.length; a++) {
        let thisTabWidth = tab[a].getBoundingClientRect().width;
        if(tab[a].querySelector('a.active') != null){
           let st = tab[a].querySelector('a').dataset.href;
           let el = document.getElementById(`${st}`);
           tab[a].classList.add('active')
           el.style.display = null;
           indicator.style.width  = `${thisTabWidth}px`
            for (let n = 0; n < a+1; n++) {
                indicator.style.transform = null
                for (let e = 0; e < n; e++) {
                    indicator.style.transform += `translatex(${tab[e].offsetWidth}px)`;
                }
            }
        }
    }
}

/*  Denker 1.1 ©2020
           range slider
========================================================================== */

const slider = document.querySelectorAll('.slider-container');
for (let f = 0; f < slider.length; f++) {
    const fill = slider[f].querySelector(':scope .bar .fill')
    const input = slider[f].querySelector('.slider');
    let attr = input.getAttribute('max');
    fill.style.width = `${input.value * (100 / attr)}%`
    input.addEventListener('input',() => {
        fill.style.width = `${input.value * (100 / attr)}%`
    })
}


/*  Denker 1.1 ©2020
           sider-nav
========================================================================== */

let trigger = document.querySelectorAll('.aside-trigger');
let side = document.querySelectorAll('.asider')
for (let g = 0; g < trigger.length; g++) {
    trigger[g].addEventListener('click',() => {
        let triggeraccion = trigger[g].dataset.side;
        let sider = document.querySelector(triggeraccion);
        sider.style.transform = `translateX(${sider.getBoundingClientRect().width * 2}px)`
    })
}
for (let g = 0; g < side.length; g++) {
    let closer = side[g].querySelector('.asider-close');
    closer.addEventListener('click',() => {
        closer.parentNode.parentNode.style.transform = null;
    })
    
}

/*  Denker 1.1 ©2020
           selectable "input"
========================================================================== */
const slgg = document.querySelectorAll('.selectable').forEach((slggt) => {
    let slops = slggt.nextElementSibling.nextElementSibling;
    let svg = slggt.nextElementSibling;
    let inp = slops.nextElementSibling;
    function open(){
        if (slops.classList.contains('active')){
            slops.classList.remove('active')
            slggt.classList.remove('active')
            slops.classList.add('exit')
            setTimeout(() => {
                slops.classList.remove('exit')
                slops.style.display = null;
            }, 500);
        }else {
            slops.classList.add('active')
            slops.style.display = "block";
            slggt.classList.add('active')
            slops.style.top = `${slggt.getBoundingClientRect().height + 5}px`;
        }
    }
    let op = slops.querySelectorAll('.op').forEach((o) => {
        o.addEventListener('click', (e) => {
            e.preventDefault();
            let html = e.currentTarget.innerHTML;
            let val = e.currentTarget.getAttribute('value');
            slggt.innerHTML = html;
            inp.value = val;
            slops.style.top = `${slggt.getBoundingClientRect().height + 5}px`;
            open()
        })
    });
    slggt.addEventListener('click', () => open() )
    svg.addEventListener('click', () => open() )
})
/*  Denker 1.1 ©2020
           tooltips
========================================================================== */
const tol = document.querySelectorAll('.ElementToltip').forEach(t => {
    let pos = t.dataset.pos;
    let newDiv = document.createElement("div"); 
    if(pos == "top" || pos == undefined){
        newDiv.style.transition = null;
        newDiv.style.left = `${t.offsetLeft - 10 +(t.clientWidth / 2 - ( newDiv.clientWidth / 2)) }px`;
        newDiv.style.top = `${t.offsetTop - t.getBoundingClientRect().height}px`;
    }else if(pos == "bottom"){
        newDiv.style.transition = null;
        newDiv.style.left = `${t.offsetLeft - 10 +(t.clientWidth / 2 - ( newDiv.clientWidth / 2)) }px`;
        newDiv.style.top = `${t.offsetTop + t.getBoundingClientRect().height}px`;
    }else if(pos == "left"){
        newDiv.style.transition = null;
        newDiv.style.left = `${t.offsetLeft - (newDiv.offsetWidth)}px`;
        newDiv.style.top = `${t.offsetTop}px`;
    }else if(pos == "right"){
        newDiv.style.left = `${t.offsetLeft + t.offsetWidth}px`;
        newDiv.style.top = `${t.offsetTop}px`;
    }
    newDiv.classList.add('denker-tooltip')
    t.addEventListener('mouseover', () => {
            newDiv.innerHTML = t.dataset.tooltip;//añade texto al div creado. 
            if(pos == "top" || pos == undefined){
                newDiv.style.transition = null;
                newDiv.style.left = `${t.offsetLeft - 10 +(t.clientWidth / 2 - ( newDiv.clientWidth / 2)) }px`;
                newDiv.style.transformOrigin = null;
                newDiv.style.transformOrigin = "bottom"
                newDiv.style.top = `${t.offsetTop - t.getBoundingClientRect().height}px`;
				setTimeout(() => {
                    newDiv.style.transition = "padding ease .3s,opacity ease .3s ,transform ease .3s";
                    newDiv.style.paddingLeft = "10px";
                    newDiv.style.paddingRight = "10px";
                    newDiv.style.opacity = "1";
                    newDiv.style.transform = `translateY(-${newDiv.getBoundingClientRect().height / 4}px) scale(1)`;
                }, 0);
            }else if(pos == "bottom"){
                newDiv.style.transition = null;
                newDiv.style.left = `${t.offsetLeft - 10 +(t.clientWidth / 2 - ( newDiv.clientWidth / 2)) }px`;
                newDiv.style.transformOrigin = null;
                newDiv.style.transformOrigin = "top";
                newDiv.style.top = `${t.offsetTop + t.getBoundingClientRect().height}px`;
				setTimeout(() => {
					newDiv.style.transition = "padding ease .3s,opacity ease .3s ,transform  ease .3s";
					newDiv.style.paddingLeft = "10px";
					newDiv.style.paddingRight = "10px";
					newDiv.style.opacity = "1";
					newDiv.style.transform = `translateY(${newDiv.getBoundingClientRect().height / 4}px) scale(1)`;
				}, 0);
            }else if(pos == "left"){
                newDiv.style.transition = null;
                newDiv.style.left = `${t.offsetLeft - (newDiv.offsetWidth)}px`;
                newDiv.style.transformOrigin = null;
                newDiv.style.transformOrigin = "right";
                newDiv.style.top = `${t.offsetTop}px`;
				setTimeout(() => {
					newDiv.style.transition = "padding ease .3s,opacity ease .3s ,transform  ease .3s";
					newDiv.style.paddingLeft = "10px";
					newDiv.style.paddingRight = "10px";
					newDiv.style.opacity = "1";
					newDiv.style.transform = `translateX(-${newDiv.getBoundingClientRect().width + 15}px) scale(1)`;
				}, 0);
            }else if(pos == "right"){
                newDiv.style.transition = null;
                newDiv.style.left = `${t.offsetLeft + t.offsetWidth}px`;
                newDiv.style.transformOrigin = null;
                newDiv.style.transformOrigin = "left";
                newDiv.style.top = `${t.offsetTop}px`;
				setTimeout(() => {
					newDiv.style.transition = "padding ease .3s,opacity ease .3s ,transform  ease .3s";
					newDiv.style.paddingLeft = "10px";
					newDiv.style.paddingRight = "10px";
					newDiv.style.opacity = "1";
					newDiv.style.transform = `translateX(${newDiv.getBoundingClientRect().width / 2}px) scale(1)`;
				}, 0);
            }
    })
    t.addEventListener('mouseout', () => {
        newDiv.style.paddingLeft = null;
        newDiv.style.paddingRight = null;
        newDiv.style.opacity = null;
        newDiv.style.transform = null;
        
    })
    let currentDiv = document.getElementById("div1"); 
    document.body.insertBefore(newDiv, currentDiv); 
    
  });
})

/*  Denker 1.1 ©2020
           switches
========================================================================== */
const switches = document.querySelectorAll('.switch')//switch clase
const switches_big = document.querySelectorAll('.switch-big')//switch-big clase
const switches_minimal = document.querySelectorAll('.switch-minimal')//switch-minimal clase
const switches_normal = document.querySelectorAll('.switch-normal')//switch-normal clase
for (let e = 0; e < switches.length; e++) {
    // switch function per toggle on/off
    switches[e].addEventListener('click',function (){
        this.classList.toggle('active')
    })
}
for (let e = 0; e < switches_minimal.length; e++) {
     // switch function per toggle on/off
    switches_minimal[e].addEventListener('click',function (){
        this.classList.toggle('active')
})}for (let e = 0; e < switches_big.length; e++) {
    // switch function per toggle on/off
    switches_big[e].addEventListener('click',function (){
        this.classList.toggle('active')
})}for (let e = 0; e < switches_normal.length; e++) {
    // switch function per toggle on/off
    switches_normal[e].addEventListener('click',function (){
        this.classList.toggle('active')
})}
/*  Denker 1.1 ©2020
           icons
========================================================================== */

const arrowb = document.querySelectorAll('.arrowToB')//switch clase
const arrowR = document.querySelectorAll('.arrowToR')//switch-big clase
const arrowt = document.querySelectorAll('.arrowToUp')//switch-minimal clase
const arrow = document.querySelectorAll('.arrow')//switch-normal clase
for (let e = 0; e < arrowb.length; e++) {
    // arrow function per toggle active/desactive
    arrowb[e].addEventListener('click',function (){
        this.classList.toggle('ok')
    })
     // arrow function per toggle active/desactive
    arrowt[e].addEventListener('click',function (){
        this.classList.toggle('ok')
    })
    // arrow function per toggle active/desactive
    arrowR[e].addEventListener('click',function (){
        this.classList.toggle('ok')
    })
    // arrow function per toggle active/desactive
    arrow[e].addEventListener('click',function (){
        this.classList.toggle('ok')
    })
}
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
/*  Denker 1.1 ©2020
           toasts
========================================================================== */


var toasts = document.querySelectorAll('.toast.Converted');
var tosting = toasts.length;
function DDToast(type = "blue",title,time,content){
    return `
    <div class="toast-header">
    <div class="title">
    <svg class="${type}" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="100%" height="100%"></rect></svg>
    <div class="title">${title}</div>
    </div>
    <div>
    <div class="time">${time}</div>
    </div>
    </div>
    <div class="content">
        ${content}
    </div>
    `
}
function Toasting() {
    for (var i = 0; i < tosting; i++) {
        let type = toasts[i].dataset.toast;
        let title = toasts[i].dataset.toastTitle;
        let time = toasts[i].dataset.toastTime;
        let content = toasts[i].innerHTML;
        toasts[i].classList.remove('Converted');
        toasts[i].removeAttribute("data-toast");
        toasts[i].removeAttribute("data-toast-title");
        toasts[i].removeAttribute("data-toast-time");
        toasts[i].innerHTML = DDToast(type, title, time, content);
    }
}Toasting();

// Required for Meteor package, the use of window prevents export by Meteor
(function(window) {
    if (window.Package) {
      D = {};
    } else {
      window.D = {};
    }
  
    // Check for jQuery
    D.jQueryLoaded = !!window.jQuery;
  })(window);
  
  // AMD
  if (typeof define === 'function' && define.amd) {
    define('D', [], function() {
      return D;
    });
  
    // Common JS
  } else if (typeof exports !== 'undefined' && !exports.nodeType) {
    if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = D;
    }
    exports.default = D;
  }

  /*
   v2.2.0
   2017 Julian Garnier
   Released under the MIT license
  */
  var $jscomp={scope:{}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(e,r,p){if(p.get||p.set)throw new TypeError("ES3 does not support getters and setters.");e!=Array.prototype&&e!=Object.prototype&&(e[r]=p.value)};$jscomp.getGlobal=function(e){return"undefined"!=typeof window&&window===e?e:"undefined"!=typeof global&&null!=global?global:e};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
  $jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(e){return $jscomp.SYMBOL_PREFIX+(e||"")+$jscomp.symbolCounter_++};
  $jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var e=$jscomp.global.Symbol.iterator;e||(e=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[e]&&$jscomp.defineProperty(Array.prototype,e,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(e){var r=0;return $jscomp.iteratorPrototype(function(){return r<e.length?{done:!1,value:e[r++]}:{done:!0}})};
  $jscomp.iteratorPrototype=function(e){$jscomp.initSymbolIterator();e={next:e};e[$jscomp.global.Symbol.iterator]=function(){return this};return e};$jscomp.array=$jscomp.array||{};$jscomp.iteratorFromArray=function(e,r){$jscomp.initSymbolIterator();e instanceof String&&(e+="");var p=0,m={next:function(){if(p<e.length){var u=p++;return{value:r(u,e[u]),done:!1}}m.next=function(){return{done:!0,value:void 0}};return m.next()}};m[Symbol.iterator]=function(){return m};return m};
  $jscomp.polyfill=function(e,r,p,m){if(r){p=$jscomp.global;e=e.split(".");for(m=0;m<e.length-1;m++){var u=e[m];u in p||(p[u]={});p=p[u]}e=e[e.length-1];m=p[e];r=r(m);r!=m&&null!=r&&$jscomp.defineProperty(p,e,{configurable:!0,writable:!0,value:r})}};$jscomp.polyfill("Array.prototype.keys",function(e){return e?e:function(){return $jscomp.iteratorFromArray(this,function(e){return e})}},"es6-impl","es3");var $jscomp$this=this;
  (function(r){D.anime=r()})(function(){function e(a){if(!h.col(a))try{return document.querySelectorAll(a)}catch(c){}}function r(a,c){for(var d=a.length,b=2<=arguments.length?arguments[1]:void 0,f=[],n=0;n<d;n++)if(n in a){var k=a[n];c.call(b,k,n,a)&&f.push(k)}return f}function p(a){return a.reduce(function(a,d){return a.concat(h.arr(d)?p(d):d)},[])}function m(a){if(h.arr(a))return a;
  h.str(a)&&(a=e(a)||a);return a instanceof NodeList||a instanceof HTMLCollection?[].slice.call(a):[a]}function u(a,c){return a.some(function(a){return a===c})}function C(a){var c={},d;for(d in a)c[d]=a[d];return c}function D(a,c){var d=C(a),b;for(b in a)d[b]=c.hasOwnProperty(b)?c[b]:a[b];return d}function z(a,c){var d=C(a),b;for(b in c)d[b]=h.und(a[b])?c[b]:a[b];return d}function T(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,c,d,k){return c+c+d+d+k+k});var c=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
  a=parseInt(c[1],16);var d=parseInt(c[2],16),c=parseInt(c[3],16);return"rgba("+a+","+d+","+c+",1)"}function U(a){function c(a,c,b){0>b&&(b+=1);1<b&&--b;return b<1/6?a+6*(c-a)*b:.5>b?c:b<2/3?a+(c-a)*(2/3-b)*6:a}var d=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(a);a=parseInt(d[1])/360;var b=parseInt(d[2])/100,f=parseInt(d[3])/100,d=d[4]||1;if(0==b)f=b=a=f;else{var n=.5>f?f*(1+b):f+b-f*b,k=2*f-n,f=c(k,n,a+1/3),b=c(k,n,a);a=c(k,n,a-1/3)}return"rgba("+
  255*f+","+255*b+","+255*a+","+d+")"}function y(a){if(a=/([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(a))return a[2]}function V(a){if(-1<a.indexOf("translate")||"perspective"===a)return"px";if(-1<a.indexOf("rotate")||-1<a.indexOf("skew"))return"deg"}function I(a,c){return h.fnc(a)?a(c.target,c.id,c.total):a}function E(a,c){if(c in a.style)return getComputedStyle(a).getPropertyValue(c.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase())||"0"}function J(a,c){if(h.dom(a)&&
  u(W,c))return"transform";if(h.dom(a)&&(a.getAttribute(c)||h.svg(a)&&a[c]))return"attribute";if(h.dom(a)&&"transform"!==c&&E(a,c))return"css";if(null!=a[c])return"object"}function X(a,c){var d=V(c),d=-1<c.indexOf("scale")?1:0+d;a=a.style.transform;if(!a)return d;for(var b=[],f=[],n=[],k=/(\w+)\((.+?)\)/g;b=k.exec(a);)f.push(b[1]),n.push(b[2]);a=r(n,function(a,b){return f[b]===c});return a.length?a[0]:d}function K(a,c){switch(J(a,c)){case "transform":return X(a,c);case "css":return E(a,c);case "attribute":return a.getAttribute(c)}return a[c]||
  0}function L(a,c){var d=/^(\*=|\+=|-=)/.exec(a);if(!d)return a;var b=y(a)||0;c=parseFloat(c);a=parseFloat(a.replace(d[0],""));switch(d[0][0]){case "+":return c+a+b;case "-":return c-a+b;case "*":return c*a+b}}function F(a,c){return Math.sqrt(Math.pow(c.x-a.x,2)+Math.pow(c.y-a.y,2))}function M(a){a=a.points;for(var c=0,d,b=0;b<a.numberOfItems;b++){var f=a.getItem(b);0<b&&(c+=F(d,f));d=f}return c}function N(a){if(a.getTotalLength)return a.getTotalLength();switch(a.tagName.toLowerCase()){case "circle":return 2*
  Math.PI*a.getAttribute("r");case "rect":return 2*a.getAttribute("width")+2*a.getAttribute("height");case "line":return F({x:a.getAttribute("x1"),y:a.getAttribute("y1")},{x:a.getAttribute("x2"),y:a.getAttribute("y2")});case "polyline":return M(a);case "polygon":var c=a.points;return M(a)+F(c.getItem(c.numberOfItems-1),c.getItem(0))}}function Y(a,c){function d(b){b=void 0===b?0:b;return a.el.getPointAtLength(1<=c+b?c+b:0)}var b=d(),f=d(-1),n=d(1);switch(a.property){case "x":return b.x;case "y":return b.y;
  case "angle":return 180*Math.atan2(n.y-f.y,n.x-f.x)/Math.PI}}function O(a,c){var d=/-?\d*\.?\d+/g,b;b=h.pth(a)?a.totalLength:a;if(h.col(b))if(h.rgb(b)){var f=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(b);b=f?"rgba("+f[1]+",1)":b}else b=h.hex(b)?T(b):h.hsl(b)?U(b):void 0;else f=(f=y(b))?b.substr(0,b.length-f.length):b,b=c&&!/\s/g.test(b)?f+c:f;b+="";return{original:b,numbers:b.match(d)?b.match(d).map(Number):[0],strings:h.str(a)||c?b.split(d):[]}}function P(a){a=a?p(h.arr(a)?a.map(m):m(a)):[];return r(a,
  function(a,d,b){return b.indexOf(a)===d})}function Z(a){var c=P(a);return c.map(function(a,b){return{target:a,id:b,total:c.length}})}function aa(a,c){var d=C(c);if(h.arr(a)){var b=a.length;2!==b||h.obj(a[0])?h.fnc(c.duration)||(d.duration=c.duration/b):a={value:a}}return m(a).map(function(a,b){b=b?0:c.delay;a=h.obj(a)&&!h.pth(a)?a:{value:a};h.und(a.delay)&&(a.delay=b);return a}).map(function(a){return z(a,d)})}function ba(a,c){var d={},b;for(b in a){var f=I(a[b],c);h.arr(f)&&(f=f.map(function(a){return I(a,
  c)}),1===f.length&&(f=f[0]));d[b]=f}d.duration=parseFloat(d.duration);d.delay=parseFloat(d.delay);return d}function ca(a){return h.arr(a)?A.apply(this,a):Q[a]}function da(a,c){var d;return a.tweens.map(function(b){b=ba(b,c);var f=b.value,e=K(c.target,a.name),k=d?d.to.original:e,k=h.arr(f)?f[0]:k,w=L(h.arr(f)?f[1]:f,k),e=y(w)||y(k)||y(e);b.from=O(k,e);b.to=O(w,e);b.start=d?d.end:a.offset;b.end=b.start+b.delay+b.duration;b.easing=ca(b.easing);b.elasticity=(1E3-Math.min(Math.max(b.elasticity,1),999))/
  1E3;b.isPath=h.pth(f);b.isColor=h.col(b.from.original);b.isColor&&(b.round=1);return d=b})}function ea(a,c){return r(p(a.map(function(a){return c.map(function(b){var c=J(a.target,b.name);if(c){var d=da(b,a);b={type:c,property:b.name,animatable:a,tweens:d,duration:d[d.length-1].end,delay:d[0].delay}}else b=void 0;return b})})),function(a){return!h.und(a)})}function R(a,c,d,b){var f="delay"===a;return c.length?(f?Math.min:Math.max).apply(Math,c.map(function(b){return b[a]})):f?b.delay:d.offset+b.delay+
  b.duration}function fa(a){var c=D(ga,a),d=D(S,a),b=Z(a.targets),f=[],e=z(c,d),k;for(k in a)e.hasOwnProperty(k)||"targets"===k||f.push({name:k,offset:e.offset,tweens:aa(a[k],d)});a=ea(b,f);return z(c,{children:[],animatables:b,animations:a,duration:R("duration",a,c,d),delay:R("delay",a,c,d)})}function q(a){function c(){return window.Promise&&new Promise(function(a){return p=a})}function d(a){return g.reversed?g.duration-a:a}function b(a){for(var b=0,c={},d=g.animations,f=d.length;b<f;){var e=d[b],
  k=e.animatable,h=e.tweens,n=h.length-1,l=h[n];n&&(l=r(h,function(b){return a<b.end})[0]||l);for(var h=Math.min(Math.max(a-l.start-l.delay,0),l.duration)/l.duration,w=isNaN(h)?1:l.easing(h,l.elasticity),h=l.to.strings,p=l.round,n=[],m=void 0,m=l.to.numbers.length,t=0;t<m;t++){var x=void 0,x=l.to.numbers[t],q=l.from.numbers[t],x=l.isPath?Y(l.value,w*x):q+w*(x-q);p&&(l.isColor&&2<t||(x=Math.round(x*p)/p));n.push(x)}if(l=h.length)for(m=h[0],w=0;w<l;w++)p=h[w+1],t=n[w],isNaN(t)||(m=p?m+(t+p):m+(t+" "));
  else m=n[0];ha[e.type](k.target,e.property,m,c,k.id);e.currentValue=m;b++}if(b=Object.keys(c).length)for(d=0;d<b;d++)H||(H=E(document.body,"transform")?"transform":"-webkit-transform"),g.animatables[d].target.style[H]=c[d].join(" ");g.currentTime=a;g.progress=a/g.duration*100}function f(a){if(g[a])g[a](g)}function e(){g.remaining&&!0!==g.remaining&&g.remaining--}function k(a){var k=g.duration,n=g.offset,w=n+g.delay,r=g.currentTime,x=g.reversed,q=d(a);if(g.children.length){var u=g.children,v=u.length;
  if(q>=g.currentTime)for(var G=0;G<v;G++)u[G].seek(q);else for(;v--;)u[v].seek(q)}if(q>=w||!k)g.began||(g.began=!0,f("begin")),f("run");if(q>n&&q<k)b(q);else if(q<=n&&0!==r&&(b(0),x&&e()),q>=k&&r!==k||!k)b(k),x||e();f("update");a>=k&&(g.remaining?(t=h,"alternate"===g.direction&&(g.reversed=!g.reversed)):(g.pause(),g.completed||(g.completed=!0,f("complete"),"Promise"in window&&(p(),m=c()))),l=0)}a=void 0===a?{}:a;var h,t,l=0,p=null,m=c(),g=fa(a);g.reset=function(){var a=g.direction,c=g.loop;g.currentTime=
  0;g.progress=0;g.paused=!0;g.began=!1;g.completed=!1;g.reversed="reverse"===a;g.remaining="alternate"===a&&1===c?2:c;b(0);for(a=g.children.length;a--;)g.children[a].reset()};g.tick=function(a){h=a;t||(t=h);k((l+h-t)*q.speed)};g.seek=function(a){k(d(a))};g.pause=function(){var a=v.indexOf(g);-1<a&&v.splice(a,1);g.paused=!0};g.play=function(){g.paused&&(g.paused=!1,t=0,l=d(g.currentTime),v.push(g),B||ia())};g.reverse=function(){g.reversed=!g.reversed;t=0;l=d(g.currentTime)};g.restart=function(){g.pause();
  g.reset();g.play()};g.finished=m;g.reset();g.autoplay&&g.play();return g}var ga={update:void 0,begin:void 0,run:void 0,complete:void 0,loop:1,direction:"normal",autoplay:!0,offset:0},S={duration:1E3,delay:0,easing:"easeOutElastic",elasticity:500,round:0},W="translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY perspective".split(" "),H,h={arr:function(a){return Array.isArray(a)},obj:function(a){return-1<Object.prototype.toString.call(a).indexOf("Object")},
  pth:function(a){return h.obj(a)&&a.hasOwnProperty("totalLength")},svg:function(a){return a instanceof SVGElement},dom:function(a){return a.nodeType||h.svg(a)},str:function(a){return"string"===typeof a},fnc:function(a){return"function"===typeof a},und:function(a){return"undefined"===typeof a},hex:function(a){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)},rgb:function(a){return/^rgb/.test(a)},hsl:function(a){return/^hsl/.test(a)},col:function(a){return h.hex(a)||h.rgb(a)||h.hsl(a)}},A=function(){function a(a,
  d,b){return(((1-3*b+3*d)*a+(3*b-6*d))*a+3*d)*a}return function(c,d,b,f){if(0<=c&&1>=c&&0<=b&&1>=b){var e=new Float32Array(11);if(c!==d||b!==f)for(var k=0;11>k;++k)e[k]=a(.1*k,c,b);return function(k){if(c===d&&b===f)return k;if(0===k)return 0;if(1===k)return 1;for(var h=0,l=1;10!==l&&e[l]<=k;++l)h+=.1;--l;var l=h+(k-e[l])/(e[l+1]-e[l])*.1,n=3*(1-3*b+3*c)*l*l+2*(3*b-6*c)*l+3*c;if(.001<=n){for(h=0;4>h;++h){n=3*(1-3*b+3*c)*l*l+2*(3*b-6*c)*l+3*c;if(0===n)break;var m=a(l,c,b)-k,l=l-m/n}k=l}else if(0===
  n)k=l;else{var l=h,h=h+.1,g=0;do m=l+(h-l)/2,n=a(m,c,b)-k,0<n?h=m:l=m;while(1e-7<Math.abs(n)&&10>++g);k=m}return a(k,d,f)}}}}(),Q=function(){function a(a,b){return 0===a||1===a?a:-Math.pow(2,10*(a-1))*Math.sin(2*(a-1-b/(2*Math.PI)*Math.asin(1))*Math.PI/b)}var c="Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),d={In:[[.55,.085,.68,.53],[.55,.055,.675,.19],[.895,.03,.685,.22],[.755,.05,.855,.06],[.47,0,.745,.715],[.95,.05,.795,.035],[.6,.04,.98,.335],[.6,-.28,.735,.045],a],Out:[[.25,
  .46,.45,.94],[.215,.61,.355,1],[.165,.84,.44,1],[.23,1,.32,1],[.39,.575,.565,1],[.19,1,.22,1],[.075,.82,.165,1],[.175,.885,.32,1.275],function(b,c){return 1-a(1-b,c)}],InOut:[[.455,.03,.515,.955],[.645,.045,.355,1],[.77,0,.175,1],[.86,0,.07,1],[.445,.05,.55,.95],[1,0,0,1],[.785,.135,.15,.86],[.68,-.55,.265,1.55],function(b,c){return.5>b?a(2*b,c)/2:1-a(-2*b+2,c)/2}]},b={linear:A(.25,.25,.75,.75)},f={},e;for(e in d)f.type=e,d[f.type].forEach(function(a){return function(d,f){b["ease"+a.type+c[f]]=h.fnc(d)?
  d:A.apply($jscomp$this,d)}}(f)),f={type:f.type};return b}(),ha={css:function(a,c,d){return a.style[c]=d},attribute:function(a,c,d){return a.setAttribute(c,d)},object:function(a,c,d){return a[c]=d},transform:function(a,c,d,b,f){b[f]||(b[f]=[]);b[f].push(c+"("+d+")")}},v=[],B=0,ia=function(){function a(){B=requestAnimationFrame(c)}function c(c){var b=v.length;if(b){for(var d=0;d<b;)v[d]&&v[d].tick(c),d++;a()}else cancelAnimationFrame(B),B=0}return a}();q.version="2.2.0";q.speed=1;q.running=v;q.remove=
  function(a){a=P(a);for(var c=v.length;c--;)for(var d=v[c],b=d.animations,f=b.length;f--;)u(a,b[f].animatable.target)&&(b.splice(f,1),b.length||d.pause())};q.getValue=K;q.path=function(a,c){var d=h.str(a)?e(a)[0]:a,b=c||100;return function(a){return{el:d,property:a,totalLength:N(d)*(b/100)}}};q.setDashoffset=function(a){var c=N(a);a.setAttribute("stroke-dasharray",c);return c};q.bezier=A;q.easings=Q;q.timeline=function(a){var c=q(a);c.pause();c.duration=0;c.add=function(d){c.children.forEach(function(a){a.began=
  !0;a.completed=!0});m(d).forEach(function(b){var d=z(b,D(S,a||{}));d.targets=d.targets||a.targets;b=c.duration;var e=d.offset;d.autoplay=!1;d.direction=c.direction;d.offset=h.und(e)?b:L(e,b);c.began=!0;c.completed=!0;c.seek(d.offset);d=q(d);d.began=!0;d.completed=!0;d.duration>b&&(c.duration=d.duration);c.children.push(d)});c.seek(0);c.reset();c.autoplay&&c.restart();return c};return c};q.random=function(a,c){return Math.floor(Math.random()*(c-a+1))+a};return q});
  /*! cash-dom 1.3.5, https://github.com/kenwheeler/cash @license MIT */
(function (factory) {
  window.cash = factory();
})(function () {
    var doc = document, win = window, ArrayProto = Array.prototype, slice = ArrayProto.slice, filter = ArrayProto.filter, push = ArrayProto.push;
  
    var noop = function () {}, isFunction = function (item) {
      // @see https://crbug.com/568448
      return typeof item === typeof noop && item.call;
    }, isString = function (item) {
      return typeof item === typeof "";
    };
  
    var idMatch = /^#[\w-]*$/, classMatch = /^\.[\w-]*$/, htmlMatch = /<.+>/, singlet = /^\w+$/;
  
    function find(selector, context) {
      context = context || doc;
      var elems = (classMatch.test(selector) ? context.getElementsByClassName(selector.slice(1)) : singlet.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector));
      return elems;
    }
  
    var frag;
    function parseHTML(str) {
      if (!frag) {
        frag = doc.implementation.createHTMLDocument(null);
        var base = frag.createElement("base");
        base.href = doc.location.href;
        frag.head.appendChild(base);
      }
  
      frag.body.innerHTML = str;
  
      return frag.body.childNodes;
    }
  
    function onReady(fn) {
      if (doc.readyState !== "loading") {
        fn();
      } else {
        doc.addEventListener("DOMContentLoaded", fn);
      }
    }
  
    function Init(selector, context) {
      if (!selector) {
        return this;
      }
  
      // If already a cash collection, don't do any further processing
      if (selector.cash && selector !== win) {
        return selector;
      }
  
      var elems = selector, i = 0, length;
  
      if (isString(selector)) {
        elems = (idMatch.test(selector) ?
        // If an ID use the faster getElementById check
        doc.getElementById(selector.slice(1)) : htmlMatch.test(selector) ?
        // If HTML, parse it into real elements
        parseHTML(selector) :
        // else use `find`
        find(selector, context));
  
        // If function, use as shortcut for DOM ready
      } else if (isFunction(selector)) {
        onReady(selector);return this;
      }
  
      if (!elems) {
        return this;
      }
  
      // If a single DOM element is passed in or received via ID, return the single element
      if (elems.nodeType || elems === win) {
        this[0] = elems;
        this.length = 1;
      } else {
        // Treat like an array and loop through each item.
        length = this.length = elems.length;
        for (; i < length; i++) {
          this[i] = elems[i];
        }
      }
  
      return this;
    }
  
    function cash(selector, context) {
      return new Init(selector, context);
    }
  
    var fn = cash.fn = cash.prototype = Init.prototype = { // jshint ignore:line
      cash: true,
      length: 0,
      push: push,
      splice: ArrayProto.splice,
      map: ArrayProto.map,
      init: Init
    };
  
    Object.defineProperty(fn, "constructor", { value: cash });
  
    cash.parseHTML = parseHTML;
    cash.noop = noop;
    cash.isFunction = isFunction;
    cash.isString = isString;
  
    cash.extend = fn.extend = function (target) {
      target = target || {};
  
      var args = slice.call(arguments), length = args.length, i = 1;
  
      if (args.length === 1) {
        target = this;
        i = 0;
      }
  
      for (; i < length; i++) {
        if (!args[i]) {
          continue;
        }
        for (var key in args[i]) {
          if (args[i].hasOwnProperty(key)) {
            target[key] = args[i][key];
          }
        }
      }
  
      return target;
    };
  
    function each(collection, callback) {
      var l = collection.length, i = 0;
  
      for (; i < l; i++) {
        if (callback.call(collection[i], collection[i], i, collection) === false) {
          break;
        }
      }
    }
  
    function matches(el, selector) {
      var m = el && (el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector || el.oMatchesSelector);
      return !!m && m.call(el, selector);
    }
  
    function getCompareFunction(selector) {
      return (
      /* Use browser's `matches` function if string */
      isString(selector) ? matches :
      /* Match a cash element */
      selector.cash ? function (el) {
        return selector.is(el);
      } :
      /* Direct comparison */
      function (el, selector) {
        return el === selector;
      });
    }
  
    function unique(collection) {
      return cash(slice.call(collection).filter(function (item, index, self) {
        return self.indexOf(item) === index;
      }));
    }
  
    cash.extend({
      merge: function (first, second) {
        var len = +second.length, i = first.length, j = 0;
  
        for (; j < len; i++, j++) {
          first[i] = second[j];
        }
  
        first.length = i;
        return first;
      },
  
      each: each,
      matches: matches,
      unique: unique,
      isArray: Array.isArray,
      isNumeric: function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
  
    });
  
    var uid = cash.uid = "_cash" + Date.now();
  
    function getDataCache(node) {
      return (node[uid] = node[uid] || {});
    }
  
    function setData(node, key, value) {
      return (getDataCache(node)[key] = value);
    }
  
    function getData(node, key) {
      var c = getDataCache(node);
      if (c[key] === undefined) {
        c[key] = node.dataset ? node.dataset[key] : cash(node).attr("data-" + key);
      }
      return c[key];
    }
  
    function removeData(node, key) {
      var c = getDataCache(node);
      if (c) {
        delete c[key];
      } else if (node.dataset) {
        delete node.dataset[key];
      } else {
        cash(node).removeAttr("data-" + name);
      }
    }
  
    fn.extend({
      data: function (name, value) {
        if (isString(name)) {
          return (value === undefined ? getData(this[0], name) : this.each(function (v) {
            return setData(v, name, value);
          }));
        }
  
        for (var key in name) {
          this.data(key, name[key]);
        }
  
        return this;
      },
  
      removeData: function (key) {
        return this.each(function (v) {
          return removeData(v, key);
        });
      }
  
    });
  
    var notWhiteMatch = /\S+/g;
  
    function getClasses(c) {
      return isString(c) && c.match(notWhiteMatch);
    }
  
    function hasClass(v, c) {
      return (v.classList ? v.classList.contains(c) : new RegExp("(^| )" + c + "( |$)", "gi").test(v.className));
    }
  
    function addClass(v, c, spacedName) {
      if (v.classList) {
        v.classList.add(c);
      } else if (spacedName.indexOf(" " + c + " ")) {
        v.className += " " + c;
      }
    }
  
    function removeClass(v, c) {
      if (v.classList) {
        v.classList.remove(c);
      } else {
        v.className = v.className.replace(c, "");
      }
    }
  
    fn.extend({
      addClass: function (c) {
        var classes = getClasses(c);
  
        return (classes ? this.each(function (v) {
          var spacedName = " " + v.className + " ";
          each(classes, function (c) {
            addClass(v, c, spacedName);
          });
        }) : this);
      },
  
      attr: function (name, value) {
        if (!name) {
          return undefined;
        }
  
        if (isString(name)) {
          if (value === undefined) {
            return this[0] ? this[0].getAttribute ? this[0].getAttribute(name) : this[0][name] : undefined;
          }
  
          return this.each(function (v) {
            if (v.setAttribute) {
              v.setAttribute(name, value);
            } else {
              v[name] = value;
            }
          });
        }
  
        for (var key in name) {
          this.attr(key, name[key]);
        }
  
        return this;
      },
  
      hasClass: function (c) {
        var check = false, classes = getClasses(c);
        if (classes && classes.length) {
          this.each(function (v) {
            check = hasClass(v, classes[0]);
            return !check;
          });
        }
        return check;
      },
  
      prop: function (name, value) {
        if (isString(name)) {
          return (value === undefined ? this[0][name] : this.each(function (v) {
            v[name] = value;
          }));
        }
  
        for (var key in name) {
          this.prop(key, name[key]);
        }
  
        return this;
      },
  
      removeAttr: function (name) {
        return this.each(function (v) {
          if (v.removeAttribute) {
            v.removeAttribute(name);
          } else {
            delete v[name];
          }
        });
      },
  
      removeClass: function (c) {
        if (!arguments.length) {
          return this.attr("class", "");
        }
        var classes = getClasses(c);
        return (classes ? this.each(function (v) {
          each(classes, function (c) {
            removeClass(v, c);
          });
        }) : this);
      },
  
      removeProp: function (name) {
        return this.each(function (v) {
          delete v[name];
        });
      },
  
      toggleClass: function (c, state) {
        if (state !== undefined) {
          return this[state ? "addClass" : "removeClass"](c);
        }
        var classes = getClasses(c);
        return (classes ? this.each(function (v) {
          var spacedName = " " + v.className + " ";
          each(classes, function (c) {
            if (hasClass(v, c)) {
              removeClass(v, c);
            } else {
              addClass(v, c, spacedName);
            }
          });
        }) : this);
      } });
  
    fn.extend({
      add: function (selector, context) {
        return unique(cash.merge(this, cash(selector, context)));
      },
  
      each: function (callback) {
        each(this, callback);
        return this;
      },
  
      eq: function (index) {
        return cash(this.get(index));
      },
  
      filter: function (selector) {
        if (!selector) {
          return this;
        }
  
        var comparator = (isFunction(selector) ? selector : getCompareFunction(selector));
  
        return cash(filter.call(this, function (e) {
          return comparator(e, selector);
        }));
      },
  
      first: function () {
        return this.eq(0);
      },
  
      get: function (index) {
        if (index === undefined) {
          return slice.call(this);
        }
        return (index < 0 ? this[index + this.length] : this[index]);
      },
  
      index: function (elem) {
        var child = elem ? cash(elem)[0] : this[0], collection = elem ? this : cash(child).parent().children();
        return slice.call(collection).indexOf(child);
      },
  
      last: function () {
        return this.eq(-1);
      }
  
    });
  
    var camelCase = (function () {
      var camelRegex = /(?:^\w|[A-Z]|\b\w)/g, whiteSpace = /[\s-_]+/g;
      return function (str) {
        return str.replace(camelRegex, function (letter, index) {
          return letter[index === 0 ? "toLowerCase" : "toUpperCase"]();
        }).replace(whiteSpace, "");
      };
    }());
  
    var getPrefixedProp = (function () {
      var cache = {}, doc = document, div = doc.createElement("div"), style = div.style;
  
      return function (prop) {
        prop = camelCase(prop);
        if (cache[prop]) {
          return cache[prop];
        }
  
        var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1), prefixes = ["webkit", "moz", "ms", "o"], props = (prop + " " + (prefixes).join(ucProp + " ") + ucProp).split(" ");
  
        each(props, function (p) {
          if (p in style) {
            cache[p] = prop = cache[prop] = p;
            return false;
          }
        });
  
        return cache[prop];
      };
    }());
  
    cash.prefixedProp = getPrefixedProp;
    cash.camelCase = camelCase;
  
    fn.extend({
      css: function (prop, value) {
        if (isString(prop)) {
          prop = getPrefixedProp(prop);
          return (arguments.length > 1 ? this.each(function (v) {
            return v.style[prop] = value;
          }) : win.getComputedStyle(this[0])[prop]);
        }
  
        for (var key in prop) {
          this.css(key, prop[key]);
        }
  
        return this;
      }
  
    });
  
    function compute(el, prop) {
      return parseInt(win.getComputedStyle(el[0], null)[prop], 10) || 0;
    }
  
    each(["Width", "Height"], function (v) {
      var lower = v.toLowerCase();
  
      fn[lower] = function () {
        return this[0].getBoundingClientRect()[lower];
      };
  
      fn["inner" + v] = function () {
        return this[0]["client" + v];
      };
  
      fn["outer" + v] = function (margins) {
        return this[0]["offset" + v] + (margins ? compute(this, "margin" + (v === "Width" ? "Left" : "Top")) + compute(this, "margin" + (v === "Width" ? "Right" : "Bottom")) : 0);
      };
    });
  
    function registerEvent(node, eventName, callback) {
      var eventCache = getData(node, "_cashEvents") || setData(node, "_cashEvents", {});
      eventCache[eventName] = eventCache[eventName] || [];
      eventCache[eventName].push(callback);
      node.addEventListener(eventName, callback);
    }
  
    function removeEvent(node, eventName, callback) {
      var events = getData(node, "_cashEvents"), eventCache = (events && events[eventName]), index;
  
      if (!eventCache) {
        return;
      }
  
      if (callback) {
        node.removeEventListener(eventName, callback);
        index = eventCache.indexOf(callback);
        if (index >= 0) {
          eventCache.splice(index, 1);
        }
      } else {
        each(eventCache, function (event) {
          node.removeEventListener(eventName, event);
        });
        eventCache = [];
      }
    }
  
    fn.extend({
      off: function (eventName, callback) {
        return this.each(function (v) {
          return removeEvent(v, eventName, callback);
        });
      },
  
      on: function (eventName, delegate, callback, runOnce) {
        // jshint ignore:line
        var originalCallback;
        if (!isString(eventName)) {
          for (var key in eventName) {
            this.on(key, delegate, eventName[key]);
          }
          return this;
        }
  
        if (isFunction(delegate)) {
          callback = delegate;
          delegate = null;
        }
  
        if (eventName === "ready") {
          onReady(callback);
          return this;
        }
  
        if (delegate) {
          originalCallback = callback;
          callback = function (e) {
            var t = e.target;
            while (!matches(t, delegate)) {
              if (t === this || t === null) {
                return (t = false);
              }
  
              t = t.parentNode;
            }
  
            if (t) {
              originalCallback.call(t, e);
            }
          };
        }
  
        return this.each(function (v) {
          var finalCallback = callback;
          if (runOnce) {
            finalCallback = function () {
              callback.apply(this, arguments);
              removeEvent(v, eventName, finalCallback);
            };
          }
          registerEvent(v, eventName, finalCallback);
        });
      },
  
      one: function (eventName, delegate, callback) {
        return this.on(eventName, delegate, callback, true);
      },
  
      ready: onReady,
  
      /**
       * Modified
       * Triggers browser event
       * @param String eventName
       * @param Object data - Add properties to event object
       */
      trigger: function (eventName, data) {
        if (document.createEvent) {
          let evt = document.createEvent('HTMLEvents');
          evt.initEvent(eventName, true, false);
          evt = this.extend(evt, data);
          return this.each(function (v) {
            return v.dispatchEvent(evt);
          });
        }
      }
  
    });
  
    function encode(name, value) {
      return "&" + encodeURIComponent(name) + "=" + encodeURIComponent(value).replace(/%20/g, "+");
    }
  
    function getSelectMultiple_(el) {
      var values = [];
      each(el.options, function (o) {
        if (o.selected) {
          values.push(o.value);
        }
      });
      return values.length ? values : null;
    }
  
    function getSelectSingle_(el) {
      var selectedIndex = el.selectedIndex;
      return selectedIndex >= 0 ? el.options[selectedIndex].value : null;
    }
  
    function getValue(el) {
      var type = el.type;
      if (!type) {
        return null;
      }
      switch (type.toLowerCase()) {
        case "select-one":
          return getSelectSingle_(el);
        case "select-multiple":
          return getSelectMultiple_(el);
        case "radio":
          return (el.checked) ? el.value : null;
        case "checkbox":
          return (el.checked) ? el.value : null;
        default:
          return el.value ? el.value : null;
      }
    }
  
    fn.extend({
      serialize: function () {
        var query = "";
  
        each(this[0].elements || this, function (el) {
          if (el.disabled || el.tagName === "FIELDSET") {
            return;
          }
          var name = el.name;
          switch (el.type.toLowerCase()) {
            case "file":
            case "reset":
            case "submit":
            case "button":
              break;
            case "select-multiple":
              var values = getValue(el);
              if (values !== null) {
                each(values, function (value) {
                  query += encode(name, value);
                });
              }
              break;
            default:
              var value = getValue(el);
              if (value !== null) {
                query += encode(name, value);
              }
          }
        });
  
        return query.substr(1);
      },
  
      val: function (value) {
        if (value === undefined) {
          return getValue(this[0]);
        }
  
        return this.each(function (v) {
          return v.value = value;
        });
      }
  
    });
  
    function insertElement(el, child, prepend) {
      if (prepend) {
        var first = el.childNodes[0];
        el.insertBefore(child, first);
      } else {
        el.appendChild(child);
      }
    }
  
    function insertContent(parent, child, prepend) {
      var str = isString(child);
  
      if (!str && child.length) {
        each(child, function (v) {
          return insertContent(parent, v, prepend);
        });
        return;
      }
  
      each(parent, str ? function (v) {
        return v.insertAdjacentHTML(prepend ? "afterbegin" : "beforeend", child);
      } : function (v, i) {
        return insertElement(v, (i === 0 ? child : child.cloneNode(true)), prepend);
      });
    }
  
    fn.extend({
      after: function (selector) {
        cash(selector).insertAfter(this);
        return this;
      },
  
      append: function (content) {
        insertContent(this, content);
        return this;
      },
  
      appendTo: function (parent) {
        insertContent(cash(parent), this);
        return this;
      },
  
      before: function (selector) {
        cash(selector).insertBefore(this);
        return this;
      },
  
      clone: function () {
        return cash(this.map(function (v) {
          return v.cloneNode(true);
        }));
      },
  
      empty: function () {
        this.html("");
        return this;
      },
  
      html: function (content) {
        if (content === undefined) {
          return this[0].innerHTML;
        }
        var source = (content.nodeType ? content[0].outerHTML : content);
        return this.each(function (v) {
          return v.innerHTML = source;
        });
      },
  
      insertAfter: function (selector) {
        var _this = this;
  
  
        cash(selector).each(function (el, i) {
          var parent = el.parentNode, sibling = el.nextSibling;
          _this.each(function (v) {
            parent.insertBefore((i === 0 ? v : v.cloneNode(true)), sibling);
          });
        });
  
        return this;
      },
  
      insertBefore: function (selector) {
        var _this2 = this;
        cash(selector).each(function (el, i) {
          var parent = el.parentNode;
          _this2.each(function (v) {
            parent.insertBefore((i === 0 ? v : v.cloneNode(true)), el);
          });
        });
        return this;
      },
  
      prepend: function (content) {
        insertContent(this, content, true);
        return this;
      },
  
      prependTo: function (parent) {
        insertContent(cash(parent), this, true);
        return this;
      },
  
      remove: function () {
        return this.each(function (v) {
          if (!!v.parentNode) {
            return v.parentNode.removeChild(v);
          }
        });
      },
  
      text: function (content) {
        if (content === undefined) {
          return this[0].textContent;
        }
        return this.each(function (v) {
          return v.textContent = content;
        });
      }
  
    });
  
    var docEl = doc.documentElement;
  
    fn.extend({
      position: function () {
        var el = this[0];
        return {
          left: el.offsetLeft,
          top: el.offsetTop
        };
      },
  
      offset: function () {
        var rect = this[0].getBoundingClientRect();
        return {
          top: rect.top + win.pageYOffset - docEl.clientTop,
          left: rect.left + win.pageXOffset - docEl.clientLeft
        };
      },
  
      offsetParent: function () {
        return cash(this[0].offsetParent);
      }
  
    });
  
    fn.extend({
      children: function (selector) {
        var elems = [];
        this.each(function (el) {
          push.apply(elems, el.children);
        });
        elems = unique(elems);
  
        return (!selector ? elems : elems.filter(function (v) {
          return matches(v, selector);
        }));
      },
  
      closest: function (selector) {
        if (!selector || this.length < 1) {
          return cash();
        }
        if (this.is(selector)) {
          return this.filter(selector);
        }
        return this.parent().closest(selector);
      },
  
      is: function (selector) {
        if (!selector) {
          return false;
        }
  
        var match = false, comparator = getCompareFunction(selector);
  
        this.each(function (el) {
          match = comparator(el, selector);
          return !match;
        });
  
        return match;
      },
  
      find: function (selector) {
        if (!selector || selector.nodeType) {
          return cash(selector && this.has(selector).length ? selector : null);
        }
  
        var elems = [];
        this.each(function (el) {
          push.apply(elems, find(selector, el));
        });
  
        return unique(elems);
      },
  
      has: function (selector) {
        var comparator = (isString(selector) ? function (el) {
          return find(selector, el).length !== 0;
        } : function (el) {
          return el.contains(selector);
        });
  
        return this.filter(comparator);
      },
  
      next: function () {
        return cash(this[0].nextElementSibling);
      },
  
      not: function (selector) {
        if (!selector) {
          return this;
        }
  
        var comparator = getCompareFunction(selector);
  
        return this.filter(function (el) {
          return !comparator(el, selector);
        });
      },
  
      parent: function () {
        var result = [];
  
        this.each(function (item) {
          if (item && item.parentNode) {
            result.push(item.parentNode);
          }
        });
  
        return unique(result);
      },
  
      parents: function (selector) {
        var last, result = [];
  
        this.each(function (item) {
          last = item;
  
          while (last && last.parentNode && last !== doc.body.parentNode) {
            last = last.parentNode;
  
            if (!selector || (selector && matches(last, selector))) {
              result.push(last);
            }
          }
        });
  
        return unique(result);
      },
  
      prev: function () {
        return cash(this[0].previousElementSibling);
      },
  
      siblings: function (selector) {
        var collection = this.parent().children(selector), el = this[0];
  
        return collection.filter(function (i) {
          return i !== el;
        });
      }
  
    });
  
  
    return cash;
});

(function($, anim) {
    'use strict';
  
    let _defaults = {
      html: '',
      title: '',
      type: 'blue',
      time: 'just now',
      displayLength: 4000,
      inDuration: 300,
      outDuration: 375,
      classes: '',
      completeCallback: null,
      activationPercent: 0.8
    };
  
    class Toast {
      constructor(options) {
        this.options = $.extend({}, Toast.defaults, options);
        this.message = this.options.html;
        this.type = this.options.type;
        this.time = this.options.time;
        this.title = this.options.title;
        this.panning = false;
        this.timeRemaining = this.options.displayLength;
  
        if (Toast._toasts.length === 0) {
          Toast._createContainer();
        }
        Toast._toasts.push(this);
        let toastElement = this._createToast();
        toastElement.M_Toast = this;
        this.el = toastElement;
        this.$el = $(toastElement);
        this._animateIn();
        this._setTimer();
      }
  
      static get defaults() {
        return _defaults;
      }
      static getInstance(el) {
        let domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Toast;
      }
      static _createContainer() {
        let container = document.createElement('div');
        container.setAttribute('id', 'toast-container');
        container.addEventListener('touchstart', Toast._onDragStart);
        container.addEventListener('touchmove', Toast._onDragMove);
        container.addEventListener('touchend', Toast._onDragEnd);
        container.addEventListener('mousedown', Toast._onDragStart);
        document.addEventListener('mousemove', Toast._onDragMove);
        document.addEventListener('mouseup', Toast._onDragEnd);
        document.body.appendChild(container);
        Toast._container = container;
      }
      static _removeContainer() {
        document.removeEventListener('mousemove', Toast._onDragMove);
        document.removeEventListener('mouseup', Toast._onDragEnd);
  
        $(Toast._container).remove();
        Toast._container = null;
      }
      static dismissAll() {
        for (let toastIndex in Toast._toasts) {
          Toast._toasts[toastIndex].dismiss();
        }
      }
      _createToast() {
        let toast = document.createElement('div');
        toast.classList.add('toast');
        toast.classList.add('tiling');
        if (!!this.options.classes.length) {
          $(toast).addClass(this.options.classes);
        }
        if (
          typeof HTMLElement === 'object'
            ? this.message instanceof HTMLElement
            : this.message &&
              typeof this.message === 'object' &&
              this.message !== null &&
              this.message.nodeType === 1 &&
              typeof this.message.nodeName === 'string'
        ) {
          toast.appendChild(this.message);
        } else if (!!this.message.jquery) {
          $(toast).append(this.message[0]);
        } else {
          toast.innerHTML = DDToast(this.type,this.title,this.time,this.message,"");
        }
        Toast._container.appendChild(toast);
        return toast;
      }
      _animateIn() {
        anim({
          targets: this.el,
          top: 0,
          opacity: 1,
          duration: this.options.inDuration,
          easing: 'easeOutCubic'
        });
      }
      _setTimer() {
        if (this.timeRemaining !== Infinity) {
          this.counterInterval = setInterval(() => {
            if (!this.panning) {
              this.timeRemaining -= 20;
            }
            if (this.timeRemaining <= 0) {
              this.dismiss();
            }
          }, 20);
        }
      }
      dismiss() {
        window.clearInterval(this.counterInterval);
        let activationDistance = this.el.offsetWidth * this.options.activationPercent;
  
        if (this.wasSwiped) {
          this.el.style.transition = 'transform .05s, opacity .05s';
          this.el.style.transform = `translateX(${activationDistance}px)`;
          this.el.style.opacity = 0;
        }
  
        anim({
          targets: this.el,
          opacity: 0,
          marginTop: -40,
          duration: this.options.outDuration,
          easing: 'easeOutExpo',
          complete: () => {
            if (typeof this.options.completeCallback === 'function') {
              this.options.completeCallback();
            }
            this.$el.remove();
            Toast._toasts.splice(Toast._toasts.indexOf(this), 1);
            if (Toast._toasts.length === 0) {
              Toast._removeContainer();
            }
          }
        });
      }
    }
    Toast._toasts = [];
    Toast._container = null;
    Toast._draggedToast = null;
    D.Toast = Toast;
    D.newToast = function(options) {
      return new Toast(options);
    };
  })(cash, D.anime);



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


/*!
 * Waves v0.6.4
 * http://fian.my.id/Waves
 *
 * Copyright 2014 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */

;(function(window) {
    'use strict';

    var Waves = Waves || {};
    var $$ = document.querySelectorAll.bind(document);

    // Find exact position of element
    function isWindow(obj) {
        return obj !== null && obj === obj.window;
    }

    function getWindow(elem) {
        return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }

    function offset(elem) {
        var docElem, win,
            box = {top: 0, left: 0},
            doc = elem && elem.ownerDocument;

        docElem = doc.documentElement;

        if (typeof elem.getBoundingClientRect !== typeof undefined) {
            box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        return {
            top: box.top + win.pageYOffset - docElem.clientTop,
            left: box.left + win.pageXOffset - docElem.clientLeft
        };
    }

    function convertStyle(obj) {
        var style = '';

        for (var a in obj) {
            if (obj.hasOwnProperty(a)) {
                style += (a + ':' + obj[a] + ';');
            }
        }

        return style;
    }

    var Effect = {

        // Effect delay
        duration: 750,

        show: function(e, element) {

            // Disable right click
            if (e.button === 2) {
                return false;
            }

            var el = element || this;

            // Create ripple
            var ripple = document.createElement('div');
            ripple.className = 'waves-ripple';
            el.appendChild(ripple);

            // Get click coordinate and element witdh
            var pos         = offset(el);
            var relativeY   = (e.pageY - pos.top);
            var relativeX   = (e.pageX - pos.left);
            var scale       = 'scale('+((el.clientWidth / 100) * 10)+')';

            // Support for touch devices
            if ('touches' in e) {
              relativeY   = (e.touches[0].pageY - pos.top);
              relativeX   = (e.touches[0].pageX - pos.left);
            }

            // Attach data to element
            ripple.setAttribute('data-hold', Date.now());
            ripple.setAttribute('data-scale', scale);
            ripple.setAttribute('data-x', relativeX);
            ripple.setAttribute('data-y', relativeY);

            // Set ripple position
            var rippleStyle = {
                'top': relativeY+'px',
                'left': relativeX+'px'
            };

            ripple.className = ripple.className + ' waves-notransition';
            ripple.setAttribute('style', convertStyle(rippleStyle));
            ripple.className = ripple.className.replace('waves-notransition', '');

            // Scale the ripple
            rippleStyle['-webkit-transform'] = scale;
            rippleStyle['-moz-transform'] = scale;
            rippleStyle['-ms-transform'] = scale;
            rippleStyle['-o-transform'] = scale;
            rippleStyle.transform = scale;
            rippleStyle.opacity   = '1';

            rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['-moz-transition-duration']    = Effect.duration + 'ms';
            rippleStyle['-o-transition-duration']      = Effect.duration + 'ms';
            rippleStyle['transition-duration']         = Effect.duration + 'ms';

            rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['-moz-transition-timing-function']    = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['-o-transition-timing-function']      = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['transition-timing-function']         = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

            ripple.setAttribute('style', convertStyle(rippleStyle));
        },

        hide: function(e) {
            TouchHandler.touchup(e);

            var el = this;

            // Get first ripple
            var ripple = null;
            var ripples = el.getElementsByClassName('waves-ripple');
            if (ripples.length > 0) {
                ripple = ripples[ripples.length - 1];
            } else {
                return false;
            }

            var relativeX   = ripple.getAttribute('data-x');
            var relativeY   = ripple.getAttribute('data-y');
            var scale       = ripple.getAttribute('data-scale');

            // Get delay beetween mousedown and mouse leave
            var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
            var delay = 350 - diff;

            if (delay < 0) {
                delay = 0;
            }

            // Fade out ripple after delay
            setTimeout(function() {
                var style = {
                    'top': relativeY+'px',
                    'left': relativeX+'px',
                    'opacity': '0',

                    // Duration
                    '-webkit-transition-duration': Effect.duration + 'ms',
                    '-moz-transition-duration': Effect.duration + 'ms',
                    '-o-transition-duration': Effect.duration + 'ms',
                    'transition-duration': Effect.duration + 'ms',
                    '-webkit-transform': scale,
                    '-moz-transform': scale,
                    '-ms-transform': scale,
                    '-o-transform': scale,
                    'transform': scale,
                };

                ripple.setAttribute('style', convertStyle(style));

                setTimeout(function() {
                    try {
                        el.removeChild(ripple);
                    } catch(e) {
                        return false;
                    }
                }, Effect.duration);
            }, delay);
        },

        // Little hack to make <input> can perform waves effect
        wrapInput: function(elements) {
            for (var a = 0; a < elements.length; a++) {
                var el = elements[a];

                if (el.tagName.toLowerCase() === 'input') {
                    var parent = el.parentNode;

                    // If input already have parent just pass through
                    if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
                        continue;
                    }

                    // Put element class and style to the specified parent
                    var wrapper = document.createElement('i');
                    wrapper.className = el.className + ' waves-input-wrapper';

                    var elementStyle = el.getAttribute('style');

                    if (!elementStyle) {
                        elementStyle = '';
                    }

                    wrapper.setAttribute('style', elementStyle);

                    el.className = 'waves-button-input';
                    el.removeAttribute('style');

                    // Put element as child
                    parent.replaceChild(wrapper, el);
                    wrapper.appendChild(el);
                }
            }
        }
    };


    /**
     * Disable mousedown event for 500ms during and after touch
     */
    var TouchHandler = {
        /* uses an integer rather than bool so there's no issues with
         * needing to clear timeouts if another touch event occurred
         * within the 500ms. Cannot mouseup between touchstart and
         * touchend, nor in the 500ms after touchend. */
        touches: 0,
        allowEvent: function(e) {
            var allow = true;

            if (e.type === 'touchstart') {
                TouchHandler.touches += 1; //push
            } else if (e.type === 'touchend' || e.type === 'touchcancel') {
                setTimeout(function() {
                    if (TouchHandler.touches > 0) {
                        TouchHandler.touches -= 1; //pop after 500ms
                    }
                }, 500);
            } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
                allow = false;
            }

            return allow;
        },
        touchup: function(e) {
            TouchHandler.allowEvent(e);
        }
    };


    /**
     * Delegated click handler for .waves-effect element.
     * returns null when .waves-effect element not in "click tree"
     */
    function getWavesEffectElement(e) {
        if (TouchHandler.allowEvent(e) === false) {
            return null;
        }

        var element = null;
        var target = e.target || e.srcElement;

        while (target.parentNode !== null) {
            if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
                element = target;
                break;
            }
            target = target.parentNode;
        }
        return element;
    }

    /**
     * Bubble the click and show effect if .waves-effect elem was found
     */
    function showEffect(e) {
        var element = getWavesEffectElement(e);

        if (element !== null) {
            Effect.show(e, element);

            if ('ontouchstart' in window) {
                element.addEventListener('touchend', Effect.hide, false);
                element.addEventListener('touchcancel', Effect.hide, false);
            }

            element.addEventListener('mouseup', Effect.hide, false);
            element.addEventListener('mouseleave', Effect.hide, false);
            element.addEventListener('dragend', Effect.hide, false);
        }
    }

    Waves.displayEffect = function(options) {
        options = options || {};

        if ('duration' in options) {
            Effect.duration = options.duration;
        }

        //Wrap input inside <i> tag
        Effect.wrapInput($$('.waves-effect'));

        if ('ontouchstart' in window) {
            document.body.addEventListener('touchstart', showEffect, false);
        }

        document.body.addEventListener('mousedown', showEffect, false);
    };

    /**
     * Attach Waves to an input element (or any element which doesn't
     * bubble mouseup/mousedown events).
     *   Intended to be used with dynamically loaded forms/inputs, or
     * where the user doesn't want a delegated click handler.
     */
    Waves.attach = function(element) {
        //FUTURE: automatically add waves classes and allow users
        // to specify them with an options param? Eg. light/classic/button
        if (element.tagName.toLowerCase() === 'input') {
            Effect.wrapInput([element]);
            element = element.parentNode;
        }

        if ('ontouchstart' in window) {
            element.addEventListener('touchstart', showEffect, false);
        }

        element.addEventListener('mousedown', showEffect, false);
    };

    window.Waves = Waves;

    document.addEventListener('DOMContentLoaded', function() {
        Waves.displayEffect();
    }, false);

})(window);