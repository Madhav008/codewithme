const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatRoomSchema = new Schema({
  roomname: { type: String, isUnique: true },
  users: [String],
  questions: [String],
});

const ChatRoom = mongoose.model("ChatRoom", ChatRoomSchema);
module.exports = ChatRoom;
