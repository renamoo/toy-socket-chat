const WebSocket = require('ws');

const ws = new WebSocket.Server({ port: 8888 });

ws.on('connection', s => {
    s.on('message', msg => {
        console.log('received: %s', msg);
        ws.clients.forEach(client => {
            client.send(msg);
        })
    });
});