const io = require('socket.io')(8800, { // OPEN A THIRD PORT
    cors: {
        origin: "http://localhost:3000" //DO THIS ON THE REACT SERVER, NOT THE API SERVER (8080)
    }
})

let activeUsers = [];


// when users connect to socket server:
io.on("connection", (socket) => {
    // add new User
    socket.on("new-user-add", (newUserID)=> { //in param
        //if user is not added previously
        if(!activeUsers.some((user) => user.userID === newUserID))
        {
            activeUsers.push({
                userID: newUserID,
                socketID: socket.id
            })
        }

        //console log the connected users:
        console.log("Connected Users:", activeUsers);
        io.emit('get-users', activeUsers); // send to FE
    })

    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketID !== socket.id) //userID fed from socket.id from FE
        console.log("User Disconnected:", activeUsers);
        io.emit('get-users', activeUsers); // send to FE
    })


    // when user A sends a message to user B, socket finds user B and sends a signal to userB.socket
    socket.on("send-message", (data) => {
        const {receiverID} = data;
        const user = activeUsers.find((user) => user.userID === receiverID);
        console.log("Sending from socket to :", receiverID)
        console.log("Data: ", data)

        if (user) {
            io.to(user.socketID).emit("recieve-message", data);
        }
    })

})