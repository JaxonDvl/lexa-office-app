const jwt = require('jsonwebtoken');
const Device = require('../db/models/device')

const jwtAuth = (socket, data) => {
    return new Promise((resolve, reject) => {
        let token = data && data.token || null;
        if (!socket || socket === 'undefined' || !clients[socket.id] || !token) {
            console.log('unauthorized access');
            message.sendError(socket, 'Invalid token')
            socket.disconnect(true);
            reject(false)
        }
        if (token) {
            jwt.verify(token, jwtSecret, function (err, decoded) {
                if (err) {
                    console.log("invalid token");
                    message.sendError(socket, 'Invalid token')
                    socket.disconnect(true);
                    reject(false)

                }
                let deviceID = decoded.deviceName;
                Device.findOne({ 'deviceName': deviceID }, (err, matchedDevice) => {
                    if(err){
                        message.sendError(socket, 'Device not found')
                        socket.disconnect(true);
                        reject(false)
                    }
                    resolve(true);
                })
            });
        }
    })
}

exports.verifyConnection = jwtAuth;

exports.authenticateDevice = function authenticateDevice(socket, data) {
    const { deviceName, password } = data;
    if (!deviceName || !password)
        return message.sendError(socket, 'Invalid deviceName or password');
    Device.findOne({ deviceName: deviceName }, (err, deviceData) => {
        if (err) {
            console.log(err)
            return message.sendError(socket, err);

        }
        else if (!deviceData) {
            console.log({ message: 'Incorrect username' })
            return message.sendError(socket, 'Invalid deviceName or password');

        }
        else if (deviceData.password !== password) {
            console.log({ message: 'Incorrect password' })
            return message.sendError(socket, 'Invalid password');

        }
        else {
            return loginDevice(socket, deviceData);
        }
    })

};

exports.authenticateWebClient = function authenticateWebClient(socket, data) {
    socket.emit('login-client.success', {message:"connected WebClient"});
    clients[socket.id] = socket;
    console.log('Device logged to socket.io. number of authorized connections:', NumberOfConnections());
    console.log('WebClient connected to  socket.io=', socket.id);

};


const loginDevice = function loginDevice(socket, device) {
    let profile = {
        uuid: device.uuid,
        deviceName: device.deviceName
    };
    let token = jwt.sign(profile, jwtSecret, {
        expiresIn: 360
    });

    let data = { profile: profile, token: token };
    socket.emit('login.success', data);
    socket.uuid = profile.uuid;
    clients[socket.id] = socket;
    console.log('Device logged to socket.io. number of authorized connections:', NumberOfConnections());
    console.log('Device profile logged to socket.io=', profile);
    return;
};
