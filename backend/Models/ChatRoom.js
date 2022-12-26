const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatRoomSchema = new Schema({
  roomname:String,
  users:[],
  questions:[],
  
});

const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema);
module.exports = ChatRoom;
