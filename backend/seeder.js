//Make a get request in axios
const axios = require('axios');
const express = require('express');
const router = express.Router();
const Metainfo = require('./Models/Metainfo');
const scrape = require('./metaextractor');

async function getallthequestions(page_number) {
    var config = {
        method: 'get',
        url: 'https://practiceapi.geeksforgeeks.org/api/vr/problems/?pageMode=explore&page=' + page_number + '&sortBy=difficulty',
        headers: {
            'Accept-Encoding': 'application/json',
        }
    };
    const res = await axios(config)
    return res.data
}


//get meta information
// 
async function getMetainfo(slug) {
    var config = {
        method: 'get',
        url: 'https://practiceapi.geeksforgeeks.org/api/latest/problems/' + slug + '/metainfo/?',
        headers: {
            'Accept-Encoding': 'application/json',
            'authority': 'practiceapi.geeksforgeeks.org',
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9',
            'cookie': 'gfguserName=madhavj211%2FeyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3LmdlZWtzZm9yZ2Vla3Mub3JnXC8iLCJpYXQiOjE2NzE1MzIzNzMsImV4cCI6MTY3NDEyNDM3MywiaGFuZGxlIjoibWFkaGF2ajIxMSIsInV1aWQiOiI0MTUyM2RjMDJhMWZkZTVmZTk5YzJjMjlhNWU0YzZiMiIsInByb2ZpbGVVcmwiOiJodHRwczpcL1wvbWVkaWEuZ2Vla3Nmb3JnZWVrcy5vcmdcL2ltZy1wcmFjdGljZVwvdXNlcl93ZWItMTU5ODQzMzIyOC5zdmciLCJpbnN0aXR1dGVJZCI6NDYsImluc3RpdHV0ZU5hbWUiOiJDaGl0a2FyYSBVbml2ZXJzaXR5LCBQdW5qYWIiLCJuYW1lIjoiSGFyaSBPbSIsImlzSW50ZXJlc3RTZWxlY3RlZCI6dHJ1ZSwicHVpZCI6InVtbU1TZG8zMVE9PSIsInBhIjoxfQ.aLCx1ZG59bcp7lvtqJSSMv8KEMuJEfdt7qWx2KnA56LEJQLX8pbci1L3oYQCHJuQl14u7FztWzxGMF731JDDYwcb_vlbt4BEOBWQgGjwx6q_jM-jGuhD2gJd84nwRVRh_9yogNy2wYqqNL63FubO5pgcCRMhJy71NHfRt7bIjqA1Ys67OGB4encIO2eYS5sZwZpfRbkwIJOO_RZEpPGZyU93bhOuzU514rGHLrjoQwdsWNBHZXThnwvLdEDxD9srzY967ix1quZ8yOuy4rEAvQ7xWeLXpqp1sYlZjK_UED1U2L6o_KCWIuTFtGN_GZ8lwtEiCGMi7UtdlOcMaW3J-w; http_referrer="https://practice.geeksforgeeks.org/problems/a-difference-of-values-and-indexes0302/1"; gfg_nluid=f1513f7c3a0850f8ed3a13135cd9f402',
            'dnt': '1',
            'origin': 'https://practice.geeksforgeeks.org',
            'referer': 'https://practice.geeksforgeeks.org/',
            'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
        }
    };

    try {
        const response = await axios(config)
        const result = response.data.results.extra;
        const initial_user_func = result.initial_user_func;
        const input = result.input;
        const data = { initial_user_func, input }
        return data;


    } catch (error) {
        console.log(error);
    };


}


router.get('/', async (req, res) => {
    try {
        var total_problems = 0;
        console.log(total_problems)
        for (let i = 57; i < 139; i++) {
            problems = await getallthequestions(i);
            for (const problem of problems.results) {
                total_problems += 1;
                console.log(total_problems)

                const { title, body } = await scrape(problem.slug);
                const { initial_user_func, input } = await getMetainfo(problem.slug);
                const questions = new Metainfo({
                    pid: problem.id,
                    slug: problem.slug,
                    java: initial_user_func.java ? initial_user_func.java.user_code : "",
                    cpp: initial_user_func.cpp ? initial_user_func.cpp.user_code : "",
                    input: input,
                    title: title,
                    body: body,
                })


                try{
                    await questions.save();
                }catch(error){
                    console.log(error.message)
                }
            }
        }
        res.send("Data saved successfully " + total_problems)
    } catch (error) {
        console.log(error.message);
    }

});

module.exports = router;

//Make a schema to store the questions
//Make a query by pid to get the url



