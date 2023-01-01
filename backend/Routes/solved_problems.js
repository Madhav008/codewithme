const express = require('express');
const router = express.Router();
const Questions = require('../Models/Questions')


const pageSize = 20;

router.get('/solved', async function (req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * pageSize;
        const questions = await Questions.find().select('id company_tags').skip(skip).limit(pageSize);;
        res.status(200).send(questions);
    } catch (error) {
        res.status(500).send(error.message);
    }
});



//Get All the questions


module.exports = router;