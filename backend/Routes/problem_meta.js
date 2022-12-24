const express = require('express');
const router = express.Router();
const MetaInfo = require('../Models/Metainfo')


const pageSize = 20;
//Get All the MetaInfo



//Get Question by pid
router.get('/:pid', async function (req, res) {
    try {
        const metaInfo = await MetaInfo.find({ pid: req.params.pid })
        res.status(200).send(metaInfo[0]);
    } catch (error) {
        res.status(500).send(error.message)
    }
});

router.get('/slug/:slug', async function (req, res) {
    try {
        console.log(req.params.slug);
        const metaInfo = await MetaInfo.find({ slug: req.params.slug })
        res.status(200).send(metaInfo[0]);
    } catch (error) {
        res.status(500).send(error.message)
    }
});


module.exports = router;