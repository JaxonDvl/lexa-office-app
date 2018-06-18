
const socketio = require('socket.io');
let clients = {};
global.clients = clients;

const Device = require('../db/models/device')
const deviceManager = require('./deviceManager')

global.jwtSecret = process.env.JWT_SECRET;
global.auth = require('./jwtauth');
global.message = require('./messaging');
global.NumberOfConnections = function() {
    return Object.keys(clients).length;
}
exports.connect =  function(server) {
    let io = socketio.listen(server);
    io.on('connection', function(socket){
        console.log("socket has a new connection:",socket.id);
        socket.on('getDevice', function(data){
            console.log("called getDevice()");
            deviceManager.getDevice(socket,data);
        })

        socket.on('message', function(data){
            console.log("called message() ");
            message.broadcast(socket,data);
        })

        socket.on('login-web', function(data){
            console.log("called authDevice()");
            auth.authenticateWebClient(socket,data);

        })

        socket.on('data-tag', function(data){
            console.log(data);
        })

        socket.on('login', function(data){
            console.log("called authDevice()");
            auth.authenticateDevice(socket,data);

        }) 

        socket.on('logout',function(token){
            clients[socket.id] && delete clients[socket.id];
            console.log("closed by the client request: ", NumberOfConnections());
        });


        socket.on('disconnect',function(token){
            clients[socket.id] && delete clients[socket.id];
            console.log("closed conn, number of connections: ", NumberOfConnections());
        });
    })

    io.on('end', function(){
        console.log('socket terminate server',NumberOfConnections());
    })
  
}