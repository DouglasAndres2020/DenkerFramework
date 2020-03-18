
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
    const drop = slider[f].querySelector('.drop');
    const html = drop.querySelector('div')
    let attr = input.getAttribute('max');
    drop.style.left = `calc(${input.value}% - 20px)`
    html.innerHTML = `${input.value}`
    fill.style.width = `${input.value * (100 / attr)}%`
    input.addEventListener('input',() => {
        drop.style.left = `calc(${input.value}% - 20px)`
        html.innerHTML = `${input.value}`
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
