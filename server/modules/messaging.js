const _ = require('lodash');
const Device = require('../db/models/device')
exports.broadcast = function (socket, data) {
    auth.verifyConnection(socket, data).then(function (result) {
        console.log('Access allowed to broadcast()');
        console.log(clients[socket.id].uuid);
        try {
            var obj = { message: data.message };
            _.each(clients, function (client, index) {
                client.emit('message', obj);
            });
        } catch (ex) {
            console.log('socket.io: Error during sending message to clients ');
        }

    }, function (err) {
        console.log('Access denied to broadcast()'); return;
    }); 
}

exports.cloudMessageTemperature = function (data) {
    let temperature;
    return new Promise(function(resolve,reject){
        var obj = { message: data.message };
        let selectedClient = _.find(clients, {uuid: "AX1"});
        if(!selectedClient) {
            reject(new Error("Could not find client."))
        }
        selectedClient.emit('cloud-message-temperature', obj, function(dataAck){
            temperature = dataAck
            if(temperature) {
                resolve(temperature)
            } else {
                reject(new Error("Something went wrong on socket: "+ selectedClient.uuid))
            }
        })
    })
}

exports.changeClockState = function(data){
    console.log(data);
    return new Promise(function(resolve,reject){
        var obj = { state: data.state };
        let selectedClient = _.find(clients, {uuid: "AX1"});
        if(!selectedClient) {
            reject(new Error("Could not find client."))
        }
        selectedClient.emit('change-clocking', obj, function(dataAck){
            if(dataAck) {
                let selectedClients = _.filter(clients, (obj) => _.has(obj,'username')) || [];
                if(selectedClients.length){
                    _.each(selectedClients, (client)=>{
                        client.emit('clocking-update', dataAck)
                    })
            
                }
                Device.update({ uuid: "AX1" }, { $set: { clocking: dataAck.clocking }}, function (err, device){
                    if(err) {
                        console.log(err);
                    }
                });
                resolve(dataAck)
            } else {
                reject(new Error("Something went wrong on socket: "+ selectedClient.uuid))
            }
        })
    })
}


exports.broadcastTagToWebClients = function (data) {
    console.log("data to be send", data);
    let selectedClients = _.filter(clients, (obj) => _.has(obj,'username')) || [];
    if(selectedClients.length){
        _.each(selectedClients, (client)=>{
            client.emit('tag-register', data)
        })

    } else {

    }

}

exports.cloudMessageHumidity = function (data) {
    let humidity;
    return new Promise(function(resolve,reject){
        var obj = { message: data.message };
        let selectedClient = _.find(clients, {uuid: "AX1"});
        selectedClient.emit('cloud-message-humidity', obj, function(dataAck){
            humidity = dataAck
            if(humidity) {
                resolve(humidity)
            } else {
                reject(new Error("Something went wrong on socket: "+ selectedClient.uuid))
            }
        })
    })
}

exports.sendError = function (socket, message) {
    console.log('socket.io: send Error to socket client');
    socket.emit('error.messages', {
        message: message
    });
};