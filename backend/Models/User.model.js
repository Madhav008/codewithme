const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id:{
    type:String,
    required:true
  },
  nodeId:{
    type:String
  },
  displayName: {
    type: String,
    required: true
  },
  username:{
    type: String,
    required:true
  },
  profileUrl:{
    type:String
  },
  photos:{
    type:String
  },
  token:{
    type:String
  },
  
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
