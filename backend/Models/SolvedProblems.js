const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SolvedProblemsSchema = new Schema({
    pid: [{
        type: String,
        isUnique: true,
    }],
    userid: String,
});

const SolvedProblems = mongoose.model('SolvedProblems', SolvedProblemsSchema);
module.exports = SolvedProblems;
