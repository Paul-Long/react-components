module.exports = function (app) {
  const io = require('socket.io')(app);
  io.on('connection', function (socket) {
    console.log('client connection');
    const clientCount = {};
    socket.on('chat', ({ channel, message }) => {
      io.in(channel).emit('chat', message);
    });
    socket.on('join', channel => {
      const count = clientCount[channel] || 0;
      clientCount[channel] = count + 1;
      socket.join(channel);
      console.log('join -> ', clientCount);
    });
    socket.on('close', (channels) => {
      channels.forEach(c => {
        const count = clientCount[c] || 0;
        clientCount[c] = count - 1;
      });
      console.log('close -> ', clientCount);
    });
  });
};
