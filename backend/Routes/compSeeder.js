const express = require('express');
const router = express.Router();
const Questions = require('../Models/Questions')
const CompanyModel = require('../Models/CompaniesModel')


async function getAllCompaniesFromDatabase() {
    const companies = await CompanyModel.find();
    return companies;
}

async function getPidOfQuestions(companyName) {
    const pid = await Questions.find({ company_tags: companyName }).select('id');
    return pid;
}


async function saveTheListofPid(companyName, pidList) {
    const res = await CompanyModel.findOneAndUpdate({ name: companyName }, { $set: { pid: pidList } });
    return res;
}

//Get Question by pid
router.get('/', async function (req, res) {
    try {
        const comp = await getAllCompaniesFromDatabase();

        for (const compName of comp) {
            const name = compName.name;
            var pid = await getPidOfQuestions(name);
            var list =new Array();

            for (const id of pid) {
                list.push(id.id);
            }
            var result = await saveTheListofPid(name, list);
            console.log(result)
        }
        
        res.status(200).send({result:"Succes"});



    } catch (error) {
        res.status(500).send(error.message)
    }
});

module.exports = router;