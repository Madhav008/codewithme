const express = require('express');
const router = express.Router();
const Questions = require('../Models/Questions')


const pageSize = 20;

router.get('/sort', async function (req, res) {
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


router.get('/companies',async function (req, res) {
    
    const pipeline = [
        {
            '$unwind': {
              'path': '$company_tags',
              'preserveNullAndEmptyArrays': true
            }
          },
          {
            '$group': {
              '_id': 1,
              'Companies': { $addToSet: '$company_tags' }
            }
          }
        
    ]

    try {
        const result = await Questions.aggregate(pipeline);
        res.status(200).send(result);
    } catch (error) {
        console.log(error.message)
    }
})

router.get('/topics',async function (req, res) {
    
    const pipeline = [
        {
            '$unwind': {
              'path': '$topics_tags',
              'preserveNullAndEmptyArrays': true
            }
          },
          {
            '$group': {
              '_id': 1,
              'Topics': { $addToSet: '$topics_tags' }
            }
          }
        
    ]

    try {
        const result = await Questions.aggregate(pipeline);
        res.status(200).send(result);
    } catch (error) {
        console.log(error.message)
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




router.get('/company/:name', async function (req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * pageSize;
        const questions = await Questions.find({ company_tags: req.params.name }).select('-url').skip(skip).limit(pageSize);
        res.status(200).send(questions);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/topic/:name', async function (req, res) {
    try {
        const questions = await Questions.find({ topics_tags: req.params.name }).select('-url').skip(skip).limit(pageSize);
        res.status(200).send(questions);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
module.exports = router;