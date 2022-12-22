const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MetaInfoSchema = new Schema({
    pid: {
        type: String,
        unique: true,
    },
    slug: String,
    java:String,
    cpp:String,
    input: String,
    title: String,
    body: String,
});

const Metainfo = mongoose.model('metainfo', MetaInfoSchema);
module.exports = Metainfo;
