const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConnectedUsersSchema = new Schema({
  id:{
    type:String,
    required:true
  },
  displayName: {
    type: String,
    required: true
  },
  
});

const ConnectedUsers = mongoose.model('ConnectedUsers', ConnectedUsersSchema);
module.exports = ConnectedUsers;
