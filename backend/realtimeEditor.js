
const ACTIONS = require('./Action');

function createSocket(socket) {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
      console.log(`User with ID: ${data.room} sent message: ${data.message}`);
    });
    
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });


}


module.exports = createSocket;