const express = require("express");
const router = express.Router();
const axios = require("axios");
require('dotenv').config();
var FormData = require("form-data");

router.post("/compile", runCode);
router.post("/run", expectedOutput);


const cokkie_data = process.env.cokkie_key + "=" + process.env.cokkie_value;
const headersData = {
    authority: "practiceapiorigin.geeksforgeeks.org",
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    cookie: cokkie_data,
    dnt: "1",
    origin: "https://practice.geeksforgeeks.org",
    // ...data.getHeaders(),
};


async function runCode(){
    const sub_id = await testSolution();
    console.log(sub_id);
    const result = await getFinalResult(sub_id,"testSolution",pid);
    console.log(result);
    // res.status(200).send(result);
}

async function testSolution(input, code, lang) {
    var data = new FormData();
    data.append('source', 'https://practice.geeksforgeeks.org');
    data.append('request_type', 'testSolution');
    data.append('input', '4\r\n1 5 4 3');
    data.append('code', '//{ Driver Code Starts\r\n//Initial Template for Java');
    data.append('language', 'java');

    var config = {
        method: 'post',
        url: 'https://practiceapiorigin.geeksforgeeks.org/api/latest/problems/container-with-most-water0535/compile/',
        headers: headersData,
        data: data
    };

    try {
        const res = await axios(config);
        console.log(res.data)
        return (res.data.results.submission_id);
    } catch (error) {
        console.log(error.message)
    }
}

async function expectedOutput(input) {
    var data = new FormData();
    data.append('source', 'https://practice.geeksforgeeks.org');
    data.append('request_type', 'expectedOutput');
    data.append('input', '4\r\n1 5 4 3');


    var config = {
        method: 'post',
        url: 'https://practiceapiorigin.geeksforgeeks.org/api/latest/problems/container-with-most-water0535/compile/',
        headers: headersData,
        data: data
    };

    try {
        const res = await axios(config);
        console.log(res.data)
        return (res.data.results.submission_id);
    } catch (error) {
        console.log(error.message)
    }

}
async function getFinalResult(sub_id, pid,sub_type) {
    var data = new FormData();
    data.append("sub_id", sub_id);
    data.append("sub_type", sub_type);
    data.append("pid", pid);

    var config = {
        method: "post",
        url: "https://practiceapiorigin.geeksforgeeks.org/api/latest/problems/submission/result/",
        headers: headersData,
        data: data,
    };

    try {
        const response = await axios(config);

        if (response.data.status == "QUEUED") {
            console.log("Processing");
            return await getFinalResult(sub_id, pid);
        } else {
            return response.data;
        }
    } catch (error) {
        console.log(error.message);
    }
}



module.exports = router;
