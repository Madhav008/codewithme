const express = require("express");
const router = express.Router();
const axios = require("axios");
require('dotenv').config();
var FormData = require("form-data");

router.post("/", getResult);
const cokkie_data = process.env.cokkie_key+"="+process.env.cokkie_value;
const headersData = {
  authority: "practiceapiorigin.geeksforgeeks.org",
  accept: "*/*",
  "accept-language": "en-US,en;q=0.9",
  cookie: cokkie_data,
  dnt: "1",
  origin: "https://practice.geeksforgeeks.org",
  // ...data.getHeaders(),
};

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
    console.log(res.data.results)
    return (res.data.results.extra.initial_user_func.java.initial_code);
  } catch (error) {
    console.log(error.message)
  }

}

async function getResult(req, res) {
  const { pid, userCode, slug, lang } = req.body;

  console.log(req.body)
  try {
    const code = await getTheIntialCode(slug);
    console.log(code)
    const sub_id = await sendSubmissionRequest(userCode, code, lang, slug);
    console.log(sub_id);
    const output = await getFinalResult(sub_id, pid);
    res.send(output);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function sendSubmissionRequest(userCode, code, lang, slug) {
  var data = new FormData();
  data.append("source", "https://practice.geeksforgeeks.org");
  data.append("request_type", "solutionCheck");
  data.append("userCode", userCode);
  data.append("code", code);
  data.append("language", "java");
  try {
    var config = {
      method: "post",
      url:
        "https://practiceapiorigin.geeksforgeeks.org/api/latest/problems/" +
        slug +
        "/compile/",
      headers: headersData,
      data: data,
    };

    const res = await axios(config);

    return res.data.results.submission_id;
  } catch (error) {
    console.log(error.message);
  }
}

async function getFinalResult(sub_id, pid) {
  var data = new FormData();
  data.append("sub_id", sub_id);
  data.append("sub_type", "solutionCheck");
  data.append("pid", String(pid));

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
