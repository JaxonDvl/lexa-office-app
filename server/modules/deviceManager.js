const Device = require('../db/models/device')

exports.getDevice = function (socket, data) {
    auth.verifyConnection(socket, data)
        .then(function (result) {
            if (!data.deviceName) socket.emit('client.error', "NO data provided");
            const device = Device.findOne({ "deviceName": data.deviceName },
             (err, matchedDevice) => {
                if(err) {
                    console.log(err )
                }
                socket.emit('user.success', matchedDevice);
            })
        });
}
