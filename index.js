const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('./config/db');
var socket = require('socket.io');
const port = 3001;

const { routes } = require('./config/routes');


app.use(express.json());
app.use(cors());

app.use('/', routes);

app.listen(port, () => {
    console.log('listening on port', port);
});

server = app.listen(8080, function(){
    console.log('server is running on port 8080')
});

io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })
});
