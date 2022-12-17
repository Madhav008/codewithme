const cheerio = require('cherio')
const axios = require('axios')

async function loadSite(){

    const res =await axios.get("https://sflix.to/movie?page=1")
    return res.data
}
async function extractData(){

    const data =await loadSite()
    const $ = cheerio.load(data)    
    console.log($.html()('div.film-detail > h2 > a').nextAll())
}

extractData()