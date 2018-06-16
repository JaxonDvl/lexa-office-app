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

exports.cloudMessage = function (data) {
    
        console.log('Access allowed to cloudBroadcast()');
        try {
            var obj = { message: data.message };
            _.each(clients, function (client, index) {
                client.emit('cloud-message', obj);
            });
        } catch (ex) {
            console.log('socket.io: Error during sending message to clients ');
        }

    
}


exports.sendError = function (socket, message) {
    console.log('socket.io: send Error to socket client');
    socket.emit('error.messages', {
        message: message
    });
};