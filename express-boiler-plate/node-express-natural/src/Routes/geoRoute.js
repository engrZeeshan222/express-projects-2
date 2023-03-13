const express = require('express')
const router = express.Router()
var natural = require('natural');
const cheerio = require("cheerio");
const rp = require("request-promise");
const puppeteer = require('puppeteer');

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
//nlp route
router.post('/geo', (req, res) => {
  (async () => {
    try {
      //const titles = [];
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      //const navigationPromise = page.waitForNavigation();
  
      await page.goto('https://dunyanews.tv/en/Business/661846-Govt-may-slash-petrol-price-by-Rs11-per-litre');
      //await page.setViewport({ width: 1440, height: 744 });
      //await navigationPromise;
  
      //Type "JavaScript" into the search bar
       const grabContent =  await page.evaluate(() => {
          const qSeletion = '.container [class="col-7-detail"] article';
          const pgTitle = document.querySelector(qSeletion);
          return pgTitle.innerText;
        });
        const geoNewsString = String(grabContent);

        const geoString = `"grabContent : ${geoNewsString}"`
      // await page.waitForSelector('.editors_pick ul li h2 a');
      // let jobTitles = await page.$$eval('.editors_pick ul li h2 a', (titles) => {
      //   return titles.map(titles => titles.innerText);
      // });
      // console.log(`Job Titles on first page of Workable are: ${jobTitles.join(', ')}`);
      await browser.close();
    } catch (e) {
      console.log(`Error while fetching workable job titles ${e.message}`);
    }
  })();
})
module.exports = router