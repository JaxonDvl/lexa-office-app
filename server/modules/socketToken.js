
const socketio = require('socket.io');
const _ = require('lodash');
let clients = {};
global.clients = clients;

const Device = require('../db/models/device')
const User = require('../db/models/user')
const Logs = require('../db/models/logs')
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
            console.log("called authWeb()",data);
            auth.authenticateWebClient(socket,data);

        })

        socket.on('data-tag', function(data){
            message.broadcastTagToWebClients(data);
        })
        socket.on('data-log', function(data){
            console.log("this info will be logged",data);
            User.findOne({tagId:data.tagId}, (err, userMatch)=> {
                if(userMatch){
                let checkInState =  "Check In";
                Logs.find({tagId:data.tagId}, (err, logsMatch)=> {
                    if(logsMatch.length !== 0) {                        
                        if(logsMatch[logsMatch.length -1].state === checkInState){
                            checkInState = "Check Out";
                            
                        }
                    } 
                    const newLog = new Logs({
                        'firstName': userMatch.firstName,
                        'lastName': userMatch.lastName,
                        'tagId': data.tagId,
                        'state' :checkInState,
                        'data' : Date.now()
                    });
                    let activeState = checkInState === "Check In" ? true: false;
                        User.update({ tagId: data.tagId}, { $set: { active: activeState } }, function (err, user) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    newLog.save((err, savedLog) => {
                        if (err) console.log(err);
                       ;
                    })
                    let selectedClients = _.filter(clients, (obj) => _.has(obj, 'username')) || [];
                    if (selectedClients.length) {
                        _.each(selectedClients, (client) => {
                            client.emit('clocking-data-log', {data:"got logs"})
                        })
    
                    }
                })
            } else {
                console.log("user not found,tagID is free");
            }
            })
            // message.broadcastTagToWebClients(data);
        })
        socket.on('hello-from-client', function(data){
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