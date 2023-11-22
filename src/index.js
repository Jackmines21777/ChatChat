// const http = require('http');
const express = require('express');
const path = require('path');
const { Socket } = require('socket.io');


const app = express();
const server = require('http').Server(app);
const socketio = require('socket.io')(server);
const io = socketio.listen(server);


app.set('port',process.env.PORT || 5000);

require('./sockets')(io);




app.use(express.static(path.join(__dirname, 'public')));


server.listen(app.get('port'), () =>{
    console.log('Server en el puerto', app.get('port'));
});

