const WebSocket= require('ws');
server=new WebSocket.Server({
    port: 12345
}, err => {

    if (err)
    console.err("Error ho gaya :", err);
    else console.log("Success");
}) ;

// function broadcast(webSocket, data){
//     webSocket.send(data);
//     console.log("seding ", data);
// }

server.broadcast = data =>{
    server.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };

server.on('connection',ws =>{
    users.push(ws);
     ws.on('message',data=>{
         console.log('CHitthi aayi hai , aayi hai :', data);
         if (data || data != '')
            server.broadcast(data);
     })
})