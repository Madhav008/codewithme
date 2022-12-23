const express = require('express');
const router = express.Router();
const Questions = require('../Models/Questions')


const pageSize = 20;
//Get All the questions
router.get('/', async function (req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * pageSize;
        const questions = await Questions.find().select('-url').skip(skip).limit(pageSize);
        res.status(200).send(questions)
    } catch (error) {
        res.status(500).send(error.message);
    }
})


//Get Question by pid
router.get('/pid/:pid', async function (req, res) {
    try {
        const questions = await Questions.find({ id: req.params.pid }).select('-url')
        res.status(200).send(questions);
    } catch (error) {
        res.status(500).send(error.message)
    }
});


//Get question by problem url
router.get('/:problem', async function (req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * pageSize;
        const questions = await Questions.find({ problem: req.params.problem }).select('-url').skip(skip).limit(pageSize);
        res.status(200).send(questions);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//Get question by difficulty
router.get('/difficulty/:difficulty', async function (req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * pageSize;
        const questions = await Questions.find({ difficulty: req.params.difficulty }).select('-url').skip(skip).limit(pageSize);
        res.status(200).send(questions);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.get('/search/:query', async function (req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * pageSize;
        const questions = await Questions.find({ name: { $regex: new RegExp(req.params.query) } }).select('-url').skip(skip).limit(pageSize);
        res.status(200).send(questions);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// { $regex: new RegExp(query) } 
module.exports = router;