/**
 * Constants Registeration
 * Connection: WS
 * Client ID
 * Try Service Instance
 * Service Response Instance
 */

let connection = new WebSocket('ws://127.0.0.1:4000/');
const clientId = parseInt(Math.random() * 1000000);
const tryService = document.querySelector("#try-service");
const serviceRequest = document.querySelector("#service-request");
const serviceResponse = document.querySelector("#service-response");
const status = {
    isConnected: false,
    restartConn: null
};

function initProcess () {
    connection.onerror = error => {
        console.log('%c Establishing Connection Again ...', 'color: red')
        status.isConnected = false;
        // restartConnection();
    }
    
    connection.onopen = () => {                
        console.log('%c Connection Established Successfully.', 'color: green');
        status.isConnected = true;
        clearInterval(status.restartConn);
    }
    
    connection.onmessage = e => {          
        try {
            const data = JSON.parse(e.data);        
            serviceResponse.value = JSON.stringify(data, undefined, 4);
        } catch (e) {
            console.log(e.message)
        }
    }
}



tryService.addEventListener('click', () => {
    const val = serviceRequest.value;
    connection.send(val);
})

function giveTab (textarea) {
    let val = textarea.value;
    let start = textarea.selectionStart;
    let end = textarea.selectionEnd;
    textarea.value = val.substring(0, start) + '\t' + val.substring(end);        
    textarea.selectionStart = textarea.selectionEnd = start + 1;
    currentTabIndex = start + 1;
    return false;
}

serviceRequest.addEventListener('keydown', function (e) {    
    if (e.keyCode === 9) {
        e.preventDefault();
        return giveTab(this);
    }
});

function restartConnection () {
    status.restartConn = setInterval(function() {
        if (!status.isConnected) {            
            connection = new WebSocket('ws://127.0.0.1:4000/');  
            initProcess();              
        }         
    }, 10000);
    
    return;
}

initProcess();