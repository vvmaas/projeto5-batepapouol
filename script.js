const sideBar = document.querySelector(".sideBar")     
const sideBar_backg = document.querySelector(".sideBar_background")



//const username = prompt("Qual seu nome ?") // use input value of logIn screen instead

function logIn() {
    const loginScreen = document.querySelector(".logIn_screen")
    loginScreen.classList.add("hidden")
}

function sideBarIn() {
    sideBar.classList.add("toScreen")
    sideBar_backg.classList.remove("hidden")
}

function sideBarOut() {
    sideBar.classList.remove("toScreen")
    sideBar_backg.classList.add("hidden")
}