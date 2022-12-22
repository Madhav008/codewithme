const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios = require('axios')


async function getSubmission(token) {
    const options = {
        method: 'GET',
        url: `http:${process.env.judgeApi}/submissions/${token}`,
        params: {base64_encoded: 'true', fields: '*'},
    };

    axios(options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            return response;
        })
        .catch(err => console.error(err));
}

router.post('/submit', async (req, res, next) => {
    console.log(req.body)
    const { code, stdin, langid } = req.body;

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
        },
        params: {base64_encoded: 'true', fields: '*'},
        url: `http://${process.env.judgeApi}/submissions`,
        params: { base64_encoded: 'true', fields: '*' },
        data: { "language_id": langid, "source_code": code, "stdin": stdin }
    };


    axios(options)
        .then(response => response.json())
        .then(response => {
            console.log(response.data)
            const result = getSubmission(response.data.token);

            if (result.status.description == 'In Queue') {
                res.status(200).json({ status: "queue", result: result })
            }

            if (result.status.description == 'Processing') {
                res.status(200).json(({ status: "processing", result: result }))
            }

            res.json({ status: "done", result: result })
        })
        .catch(err => console.error(err));

    next()
});



module.exports = router;
