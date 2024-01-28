module.exports = (socket, next) => {
    console.log(socket.handshake.headers.origin, socket.handshake.time);
    next()
}
