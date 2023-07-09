const express = require('express');
const app = express();
const http = require('http');
const { emit } = require('process');
const server = http.createServer(app);
const PORT = 8000

const { Server } = require("socket.io");
const io = new Server(server);

let users = []

app.get('/', (req, res) => { res.send('Server running') })

io.on('connection', (socket) => {
    console.log('User connected')
    socket.on('userDetails', ({userName, email}) =>{
        const user = {
            userName : userName,
            email : email,
            id : socket.id
        }

        if(userName && email !== null){
            users.push(user)
            socket.emit('onlineUsers', users)
            socket.broadcast.emit('userJoined', user)
            console.log(users);
        }
    })

    socket.on('send', (message) =>{
        console.log(message);
        socket.broadcast.emit('receive', message)
    })

    socket.on('disconnect', ()=>{
        console.log("Disconnected")
        users = users.filter((item) => item.id !==socket.id)
        socket.broadcast.emit('userLeft', users, socket.id)
        console.log(users);
    })
})

server.listen(PORT, () => {
    console.log(`PORT IS RUNNING ON http://localhost:${PORT}`);
});