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
router.post('/cheerio', (req, res) => {
// scaping data
const reqLink = `https://dunyanews.tv/en/Business/661846-Govt-may-slash-petrol-price-by-Rs11-per-litre`;
/* Cherio:
  steps:
  1.loading
  2.HTML - parsing to have dom
  3.Selectors
  4.rendering / Operqtion on data
*/
rp(reqLink)
  .then(function (htmldata) {
    
    //cherio load
     const $ = cheerio.load(htmldata);  // load the body of url
     //cherio selector
     const selectedContent = $(`.container [class=".col-7-detail"] p`);
console.log(selectedContent)
     const wiki = [];
    for (let i = 0; i < title.length; i++) {
      const Name = selectedContent[i].attribs.title;
      const Link = selectedContent[i].attribs.href;
      wiki.push({ Name, Link });
     //console.log(`Name : ${wiki[i]['Name']}    : Title ${wiki[i]['Link']}`)
    }
    // serialization of data
    const resultData = JSON.stringify(wiki); 
    console.log(resultData);

    return Promise.all(
      wiki.map((urlorObjectofArraywithKVP) => {
        return rp(`https://simple.wikipedia.org/${urlorObjectofArraywithKVP.Link}`)
          .then((html) => {
            const $ = cheerio.load(html);
            const newData = {
              OfficePeriod: $(".infobox tr:nth-child(5) td").text(),
            };
            return newData;
          })
          .catch((error) => {
            console.log(error);
          });
      })
    );
  })
  .then((res) => console.log(res))
  .catch(function (err) {
    console.log(err);
  });
  //data
  //   const data = req.body;
  //   const string1 = data['key1'];
  //   const string2 = data['key2'];
  //   console.log(string1)
  //   console.log(`============================================================`)
  //   console.log(string2)
  //   //Tokenizers 
  //               //Word Tokenizer
  //               var tokenizer = new natural.WordTokenizer();
  //               const Result = tokenizer.tokenize(string1)
  //               console.log(Result);
  // res.send(`Data  : ${data['key']}`)
})


router.post('/puppeteer',  async (req,res)=>{
  
//scarping using puppeteer = Checkly - Monitoring SaaS that uses Puppeteer to check availability and correctness of web pages and apps.
(async () => {
  try{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com');
    //ScreenShot
    const SC = await page.screenshot({path: 'example.png'});
    res.download('./example.png')
    //Pdf of page 
    const pdf = await page.pdf({
      path: "page.pdf",
      format: "A4",
      printBackground: true,
      scale: 0.5,
      displayHeaderFooter: false,
      margin: { bottom: "50px" },
    });
  
    console.log(page.url());
    console.log(typeof page.url());
    // Downloading Pdf
    res.download('./page.pdf')
    // Save file as get-dimensions.js
    // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    };
  });

  console.log('Dimensions:', dimensions);
    await browser.close();
  
  }catch(error){
    console.log(error);

  }

})();


// // To scrape the job titles on the first page of Workable we will use the following code:

(async () => {
  try {
    //const titles = [];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    //const navigationPromise = page.waitForNavigation();

    await page.goto('https://en.wikipedia.org/wiki/Pakistan');
    //await page.setViewport({ width: 1440, height: 744 });
    //await navigationPromise;

    //Type "JavaScript" into the search bar
     const grabPic =  await page.evaluate(() => {
        const qSeletion = './mediawiki.ltr.sitedir-ltr.mw-hide-empty-elt.ns-0.ns-subject.page-Pakistan.rootpage-Pakistan.skin-vector.action-view.skin-vector-legacy.content.mw-indicators';
        const pgTag = document.querySelector(qSeletion);
        return pgTag.innerText;
      });
      console.log(`grabPic : ${grabPic}`);
    await page.waitForSelector('.editors_pick ul li h2 a');
    let jobTitles = await page.$$eval('.editors_pick ul li h2 a', (titles) => {
      return titles.map(titles => titles.innerText);
    });
    console.log(`Job Titles on first page of Workable are: ${jobTitles.join(', ')}`);
    await browser.close();
  } catch (e) {
    console.log(`Error while fetching workable job titles ${e.message}`);
  }
})();






})


//nlp route

module.exports = router