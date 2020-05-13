const SocketIO = require('socket.io');
const argv = require('yargs').argv;

const MasterSocket = require('./socket/master-socket');
const SlaveSocket = require('./socket/slave-socket');

const Debug = require('./tools/debug');

const Identity = require('./socket/identity');
const map = require('./memory/instance-map');

module.exports = exports = function Launch(server) {
    // Run socket.io on top of the server.
    const io = SocketIO.listen(server);
    // On incoming connection.
    io.on('connection', onConnect);
};

const onConnect = (socket) => {
    // Verify authenticity.
    const identity = getIdentity(socket);
    // All mandatory credentials must be present.
    if (identity.id)
        acceptSocket(socket, identity);
    // Kick unauthenticated socket.
    else kickSocket(socket, identity);
};

const getIdentity = (socket) => {
    const handshake = socket.handshake;
    const localhost = argv.dev && /localhost/.test(handshake.headers.host);
    // Isolate incoming participant's fingerprint, ipv4 address, and ua string.
    const fingerprint = handshake.query.identity;
    const ip = localhost ? '::1' : handshake.address.substring(7);
    const userAgent = handshake.headers['user-agent'];
    return new Identity(fingerprint, ip, userAgent);
};

const acceptSocket = (socket, identity) => {
    Debug.logConnectionCount(identity.ip + ' connected with id > ' + identity.id);
    let instance = null;
    // Init socket as master or slave - connections will only be able to perform as either.
    socket.on('master_confirm', () => onMasterConfirm(instance, socket, identity));
    socket.on('slave_confirm', () => onSlaveConfirm(instance, socket, identity));
    socket.on('disconnect', () => onDisconnect(instance, identity.id));
};

const onMasterConfirm = (instance, socket, identity) => {
    if (!instance) {
        Debug.log('master confirmed > ' + identity.id);
        instance = new MasterSocket(identity, socket);
        map.add(identity.id, instance);
    }
};

const onSlaveConfirm = (instance, socket, identity) => {
    if (!instance) {
        Debug.log('slave confirmed > ' + identity.id);
        instance = new SlaveSocket(identity, socket);
        map.add(identity.id, instance);
    }
};

const onDisconnect = (instance, id) => {
    // Run disconnect handler for instance.
    if (instance) instance.onDisconnect();
    // Remove instance from map.
    map.remove(id);
    // Log ip of disconnected participant.
    Debug.logConnectionCount('socket disconnected > ' + id);
};

const kickSocket = (socket, {ip, id, ua}) => {
    // If unable to verify participant, kick from server.
    Debug.log(
        'Could not verify participant >',
        'ID: ' + id,
        'IP: ' + ip,
        'UA: ' + ua,
        'Kicking...'
    );
    socket.disconnect();
};
