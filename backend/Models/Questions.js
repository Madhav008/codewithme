const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProblemsSchema = new Schema({
  id: {
    type:String,
    unique : true,
  },
  name: String,
  slug: String,
  difficulty: String,
  company_tags:[
    String,
  ],
  topics_tags:[
    String,
  ],
  url:String,
});

const ChatRoom = mongoose.model('problems', ProblemsSchema);
module.exports = ChatRoom;
