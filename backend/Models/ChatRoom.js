const mongoose = require("mongoose");
const Problems = require("./Questions")
const Schema = mongoose.Schema;
const ProblemsSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  name: String,
  slug: String,
  difficulty: String,
  company_tags: [
    String,
  ],
  topics_tags: [
    String,
  ],
  url: String,
});

const ChatRoomSchema = new Schema({
  roomname: { type: String, isUnique: true },
  users: [String],
  questions: [ProblemsSchema],
});

const ChatRoom = mongoose.model("ChatRoom", ChatRoomSchema);
module.exports = ChatRoom;
