const _ = require('lodash');
 
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