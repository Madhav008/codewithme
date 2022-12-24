const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  name: {
    type:String,
    isUnique:true,
  },
  pid:[]
});

const Topics = mongoose.model('topics', TopicSchema);
module.exports = Topics;
