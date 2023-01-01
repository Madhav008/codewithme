const express = require('express');
const router = express.Router();
const SolvedProblems = require('../Models/SolvedProblems')

const pageSize = 20;

router.post('/solved', async function (req, res) {
    try {
        const { userid, pid } = req.body;

        if (!userid || !pid) {
            res.status(404).json({ message: "Please provide all required fields" });
        }
        const res = await SolvedProblems.findById({ userid: userid });
        const pids = res[0].pids;

        const questions = new SolvedProblems({
            userid: userid,
            pid: [...pids, pid],
        })
        res.status(200).send(questions);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/solved', async function (req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * pageSize;
        const questions = await SolvedProblems.find().skip(skip).limit(pageSize);;
        res.status(200).send(questions);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/unsolved', async function (req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * pageSize;
        const questions = await SolvedProblems.find().skip(skip).limit(pageSize);;
        res.status(200).send(questions);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


//Get All the questions


module.exports = router;