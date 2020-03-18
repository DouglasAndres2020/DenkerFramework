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