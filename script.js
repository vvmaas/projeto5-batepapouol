const usersList = [];
let username;

const sideBar = document.querySelector(".sideBar")     
const sideBar_backg = document.querySelector(".sideBar_background")

const optionsVis = document.querySelectorAll(".option_visibility")
const optionsCon = document.querySelectorAll(".option_contact")
let selectedCon = "Todos";

const msgBox = document.querySelector(".msgBox")
let msgTxt = document.querySelector("textarea")

//

function refresh(){
    window.location.reload()
}

//

function logIn() {
    const loginScreen = document.querySelector(".logIn_screen")
    const loginMenu = loginScreen.querySelector(".logIn_menu")
    const loginInput = loginMenu.querySelector("input")

    if (loginInput.value === "" || loginInput.value === undefined || loginInput.value === null ) {
        alert("Insira um nome de usuário.")
    } else {
        username = loginInput.value
        msgBox.innerHTML += ` <div class="statusMsg"><span><em>current:time</em> <strong>${username}</strong> entrou na sala...</span></div>`
        loginScreen.classList.add("hidden")
    }
}

//

function sideBarIn() {
    sideBar.classList.add("toScreen")
    sideBar_backg.classList.remove("hidden")
}

//

function sideBarOut() {
    sideBar.classList.remove("toScreen")
    sideBar_backg.classList.add("hidden")
}

//

function toggleVis(element) {
    let check = element.querySelector(".check")
    for(let i = 0; i < 2; i ++){
        let checkloop = optionsVis[i].querySelector(".check");
        if (checkloop.classList.contains("hidden") === false){
            checkloop.classList.add("hidden")
        }
    }
    if (check.classList.contains("hidden") === true){
        check.classList.remove("hidden")
    }
}

//

function toggleCon(element) {
    let check = element.querySelector(".check")
    for(let i = 0; i < optionsCon.length; i ++){
        let checkloop = optionsCon[i].querySelector(".check");
        if (checkloop.classList.contains("hidden") === false){
            checkloop.classList.add("hidden")
        }
    }
    if (check.classList.contains("hidden") === true){
        check.classList.remove("hidden")
        selectedCon = element.querySelector("div").innerHTML
    }
}

//

function sendMsg() {
    if (msgTxt.value !== ""){
        let pubCheck = optionsVis[0].querySelector(".check").classList.contains("hidden")
        if (pubCheck !== true){
            sendPubMsg();
        }
        let privCheck = optionsVis[1].querySelector(".check").classList.contains("hidden")
        if (privCheck !== true){
            sendPrivMsg();
        }
    }
}

//

function sendPubMsg() {
    msgBox.innerHTML += 
    `<div class="publicMsg"><span><em>current:time</em> <strong>${username}</strong> para <strong>${selectedCon}</strong>: ${msgTxt.value}</span></div>`
    msgTxt.value = ""
}

//

function sendPrivMsg() {
    msgBox.innerHTML += 
    `<div class="privateMsg"><span><em>current:time</em> <strong>${username}</strong> reservadamente para <strong>${selectedCon}</strong>: ${msgTxt.value}</span></div>`
    msgTxt.value = ""
}