let usersList = []
let username = "default"
let usernameObj

const loginScreen = document.querySelector(".logIn_screen")

const sideBar = document.querySelector(".sideBar")     
const sideBar_backg = document.querySelector(".sideBar_background")
let sideBar_contacts = sideBar.querySelector("ul")

const optionsVis = document.querySelectorAll(".option_visibility")
let optionsCon = document.querySelectorAll(".option_contact")
let todos
let selectedCon = "Todos"

const msgBox = document.querySelector(".msgBox")
let msgTxt = document.querySelector("textarea")
let destination = document.querySelector(".msg span")

//

function refresh(){
    window.location.reload()
}

//

function logIn() {
    const loginMenu = loginScreen.querySelector(".logIn_menu")
    const loginInput = loginMenu.querySelector("input")
    

    if (loginInput.value === "") {
        alert("Insira um nome de usuário.")
    } else {
        username = loginInput.value
        usernameObj = {
            name: username
          }
        const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', usernameObj)
        promise.then(logInSuccess)
        promise.catch(logInFailure)
    }
}

//

function logInSuccess() { 
    logInAnimation()
    setInterval(keepConnection, 5000)
}

//

function logInAnimation() {
    loginScreen.querySelector(".logIn_menu").classList.add("hidden")
    loginScreen.querySelector(".starting").classList.remove("hidden")
    setTimeout(hideLogIn, 4000)
}

//

function hideLogIn() {
    loginScreen.classList.add("hidden")
}

//

function logInFailure(error) {
    if (error.response.status === 400) {
        alert("Esse nome já está sendo utilizado. Digite um novo nome.")
    }
}

//

function keepConnection() {
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", usernameObj)
}

//

function getContacts() {
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants')
    promise.then(fillContacts)
}

getContacts()
setInterval(getContacts, 3000)

//

function fillContacts(contacts){
    sideBar_contacts.innerHTML = ` <li class="option_contact" onclick="toggleCon(this)" data-identifier="participant"><ion-icon name="people" class="icon_sidebar"></ion-icon><div>Todos</div><ion-icon name="checkmark" class="check hidden"></ion-icon></li>`
    usersList = contacts.data;
    for(let i = 0; i < usersList.length; i++){
        sideBar_contacts.innerHTML += `<li class="option_contact" onclick="toggleCon(this)" data-identifier="participant"><ion-icon name="person-circle" class="icon_sidebar"></ion-icon><div>${usersList[i].name}</div><ion-icon name="checkmark" class="check hidden"></ion-icon></li>`
    }
    optionsCon = ""
    optionsCon = document.querySelectorAll(".option_contact")


    if (selectedCon === "Todos"){
        todos = document.querySelector("ul li")
        toggleCon(todos)
    } else {
    let vibe = 0
    for (let i = 0; i < usersList.length; i++){
        let nameCon = usersList[i].name
        if (nameCon === selectedCon){
            toggleCon(optionsCon[i+1])
            visDestination()
            vibe = 1
        }
    }
    if (vibe !== 0){
        return true
    } else {
        todos = document.querySelector("ul li")
        toggleCon(todos)
        visDestination()
        setTimeout(alert("O contato selecionado saiu da sala."), 500)
    }
}

}

//

function getMsgs() {
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promise.then(fillMsgs)
}

setInterval(getMsgs, 3000);

//

function fillMsgs(Msgs) {
    msgBox.innerHTML = ""
    let MsgData = Msgs.data
    let hidden = ""
    for(let i = 0; i < MsgData.length; i++){
        if(MsgData[i].type === "message"){
        msgBox.innerHTML += `<div class="message"><span><em>${MsgData[i].time}</em> <strong>${MsgData[i].from}</strong> para <strong>${MsgData[i].to}</strong>: ${MsgData[i].text}</span></div>`
        }
        if(MsgData[i].type === "private_message"){
            if (MsgData[i].from !== username && MsgData[i].to !== username){
                hidden = "hidden"
            }
            msgBox.innerHTML += `<div class="private_message ${hidden}"><span><em>${MsgData[i].time}</em> <strong>${MsgData[i].from}</strong> reservadamente para <strong>${MsgData[i].to}</strong>: ${MsgData[i].text}</span></div>`
            hidden = ""
        }
        if(MsgData[i].type === "status") {
            msgBox.innerHTML += `<div class="status"><span><em>${MsgData[i].time}</em> <strong>${MsgData[i].from}</strong> ${MsgData[i].text}`
        }
    }
    autoscroll()
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
    visDestination()
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
    visDestination()
}

toggleCon(optionsCon[0])

//

function visDestination() {
    let privCheck = optionsVis[1].querySelector(".check").classList.contains("hidden")
    if (privCheck !== true){
        destination.innerHTML = `Escrevendo para ${selectedCon} (reservadamente)` 
    } 
    let pubCheck = optionsVis[0].querySelector(".check").classList.contains("hidden")
    if (pubCheck !== true){
        destination.innerHTML = `Escrevendo para ${selectedCon}`
    }
}

//

function sendMsg() {
    if (msgTxt.value !== "" && selectedCon !== username){
        let pubCheck = optionsVis[0].querySelector(".check").classList.contains("hidden")
        if (pubCheck !== true){
            postPubMsg();
        }
        let privCheck = optionsVis[1].querySelector(".check").classList.contains("hidden")
        if (privCheck !== true){
            postPrivMsg();
        }
    }
    if (selectedCon === username){
        alert("Não se pode enviar mensagens para si mesmo!")
    }

}

//

function postPubMsg() {
    let pubMsgObj = {
        from: username,
        to: selectedCon,
        text: msgTxt.value,
        type: "message"
    }
    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', pubMsgObj)
    promise.then(getPubMsg)
    promise.catch(refresh)
}

//

function getPubMsg() {
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promise.then(sendPubMsg)
}

//

function sendPubMsg(msg) {
    msgBox.innerHTML += `<div class="message"><span><em>${msg.data[99].time}</em> <strong>${msg.data[99].from}</strong> para <strong>${msg.data[99].to}</strong>: ${msg.data[99].text}</span></div>`

    autoscroll()
    msgTxt.value = ""
}

//

function postPrivMsg() {
    if(selectedCon === "Todos"){
        alert("Não se pode enviar mensagens reservadas para todos!\nSelecione um contato ou selecione o modo de mensagens públicas.")
    } else {
    let privMsgObj = {
        from: username,
        to: selectedCon,
        text: msgTxt.value,
        type: "private_message"
    }
    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', privMsgObj)
    promise.then(getPrivMsg)
    promise.catch(refresh)
}
}

//

function getPrivMsg() {
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promise.then(sendPrivMsg)
}

//

function sendPrivMsg(msg) {
    msgBox.innerHTML += 
    `<div class="private_message"><span><em>${msg.data[99].time}</em> <strong>${msg.data[99].from}</strong> reservadamente para <strong>${msg.data[99].to}</strong>: ${msg.data[99].text}</span></div>`

    autoscroll()
    msgTxt.value = ""
}

//

function autoscroll() {
    let msgs = msgBox.querySelectorAll("div")
    let lastMsg = msgs.length - 1
    msgs[lastMsg].scrollIntoView()
}

