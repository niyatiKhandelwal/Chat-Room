const connection = new WebSocket('ws://localhost:12345');
box = document.getElementById('box');
msg = document.getElementById('msg');


connection.addEventListener('open', () => {
    console.log('connected');
});

connection.addEventListener('message', e => {
    console.log("message being sent is :", e );
    if (e.data["type"] === "message") {
        let p = document.createElement('p');
        p.textContent = e.data.message;
        box.appendChild(p);
    }
});

function send(data) {
    if (connection.readyState === WebSocket.OPEN) {
        console.log("sending data ", data);
        connection.send(data);
    } else {
        throw 'Not connected';
    }
}

console.log(msg, box);
msg.addEventListener('keydown', e => {
    let kc = e.which || e.keyCode;
    if (kc == 13) {
        console.log("Text entered :", msg.value);
        send({
            "type": "message",
            "time": new Date(),
            "message": msg.value
        }
        );
        msg.value = '';
    }

});



document.getElementById("user").addEventListener('keydown', e => {
    let kc = e.which || e.keyCode;
    if (kc == 13) {
        console.log("Text entered :", document.getElementById("user").value);
        var userName = '';
        userName = document.getElementById("user").value;

        send({
            "type": "meta",
            "userName": userName
        })
    }
    return false;
});