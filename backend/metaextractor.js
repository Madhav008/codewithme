const puppeteer = require('puppeteer');


async function scrape(slug) {
    const browser = await puppeteer.launch({headless:true,slowMo:0})
    const page = await browser.newPage()
    await page.goto('https://practice.geeksforgeeks.org/problems/'+slug+'/1')
  
    // interact with the page and scrape data as needed
    const title = await page.evaluate(() => {
        return document.querySelector("#scrollableDiv > div > div:nth-child(1) > div.problems_header_content__o_4YA > div > h3").textContent
      })

    const body = await page.evaluate(() => {
        return document.querySelector("#scrollableDiv > div > div:nth-child(1) > div:nth-child(4) > div.problems_problem_content__Xm_eO").innerHTML
    })
    await browser.close()

    const data = {title: title, body: body}
    return data 
  }
  
module.exports = scrape