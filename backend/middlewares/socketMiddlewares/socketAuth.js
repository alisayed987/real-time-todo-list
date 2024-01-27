const jwt = require('jsonwebtoken');

module.exports = (socket, next) => {
  const token = socket.handshake.headers.token;
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return next(new Error("Authentication error"));
    }
    socket.user = user;
    next();
  });
};
