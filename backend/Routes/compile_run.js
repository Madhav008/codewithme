const express = require("express");
const router = express.Router();
const axios = require("axios");
require('dotenv').config();
var FormData = require("form-data");

router.post("/compile", runCode);
router.post("/run", getOutput);


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

async function getOutput(req,res){
    const {input,slug,pid} = req.body;
    console.log(req.body)
    const sub_id = await expectedOutput(input,slug);
    console.log(sub_id);
    const result = await getFinalResult(sub_id,"expectedOutput",pid);
    console.log(result);
    res.status(200).send(result);
}

async function runCode(req,res){
    const {input,userCode,lang,slug,pid} = req.body;
    console.log(req.body)
    const sub_id = await testSolution(input,userCode,lang,slug);
    console.log(sub_id);
    const result = await getFinalResult(sub_id,"testSolution",pid);
    console.log(result);
    res.status(200).send(result);
}
async function getTheIntialCode(slug) {
    var config = {
      method: "get",
      url:
        "https://practiceapi.geeksforgeeks.org/api/latest/problems/" +
        slug +
        "/metainfo/?",
      headers: {
        "Accept-Encoding": "application/json",
        ...headersData
      },
    };
  
    try {
      const res = await axios(config);
      // console.log(res.data.results)
      return (res.data.results.extra.initial_user_func.java.initial_code);
    } catch (error) {
      console.log(error.message)
    }
  
  }
  
async function testSolution(input, code, lang,slug) {
    var data = new FormData();
    const initialcode = await getTheIntialCode(slug);

    data.append('source', 'https://practice.geeksforgeeks.org');
    data.append('request_type', "testSolution");
    data.append('input', String(input));
    const finalCode =initialcode+"\r\n"+ code;
    console.log(finalCode);
    data.append('code', String(finalCode));
    data.append('language', String(lang));

    var config = {
        method: 'post',
        url: 'https://practiceapiorigin.geeksforgeeks.org/api/latest/problems/'+slug+'/compile/',
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

async function expectedOutput(input,slug) {
    var data = new FormData();
    data.append('source', 'https://practice.geeksforgeeks.org');
    data.append('request_type', 'expectedOutput');
    data.append('input', input);


    var config = {
        method: 'post',
        url: 'https://practiceapiorigin.geeksforgeeks.org/api/latest/problems/'+slug+'/compile/',
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
    data.append('sub_id', String(sub_id));
    data.append('sub_type', String(sub_type));
    data.append('pid', String(pid));

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
        console.log(error);
    }
}



module.exports = router;
