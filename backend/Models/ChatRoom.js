const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatRoomSchema = new Schema({
  chatRoomUsers: {},
});

const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema);
module.exports = ChatRoom;
