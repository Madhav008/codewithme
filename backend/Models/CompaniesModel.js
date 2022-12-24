const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompaniesSchema = new Schema({
    name: {
        type: String,
        isUnique: true,
    },
    pid: []
});

const Companies = mongoose.model('companies', CompaniesSchema);
module.exports = Companies;
