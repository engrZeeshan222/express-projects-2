const express = require('express')
const router = express.Router()
var natural = require('natural');
const cheerio = require("cheerio");
const rp = require("request-promise");
const puppeteer = require('puppeteer');
const aposToLexForm = require('apos-to-lex-form');
var distance = require('jaro-winkler');

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
//nlp route
router.post('/urdu', (req, res) => {
    //UrduPoint
//  (async () => {
//     try {
//       const browser = await puppeteer.launch();
//       const page = await browser.newPage();
//       const navigationPromise = page.waitForNavigation();
  
//       await page.goto('https://www.urdupoint.com/business/petroleum-prices-in-pakistan.html');
//       await page.setViewport({ width: 1440, height: 744 });
//        await navigationPromise;
  
//       //Type "JavaScript" into the search bar
//        const grabContent =  await page.evaluate(() => {
//           const qSeletion = '[class="fs16 lh24"]';
//           const pgTitle = document.querySelector(qSeletion);
//           return pgTitle.innerText;
//         });
//         const urduString = `${grabContent}`;

//     //GeoNews
//         (async () => {
//             try {
//               const browser = await puppeteer.launch();
//               const page = await browser.newPage();
//               const navigationPromise = page.waitForNavigation();
          
//               await page.goto('https://dunyanews.tv/en/Business/661846-Govt-may-slash-petrol-price-by-Rs11-per-litre');
//               await page.setViewport({ width: 1440, height: 744 });
//               await navigationPromise;
          
//               //Type "JavaScript" into the search bar
//                const grabContent =  await page.evaluate(() => {
//                   const qSeletion = '.container [class="col-7-detail"] article';
//                   const pgTitle = document.querySelector(qSeletion);
//                   return pgTitle.innerText;
//                 });
//                 const geoNewsString = String(grabContent);
        
//                 const geoString = `${geoNewsString}`;
//                           //Processing of Data
                
//         // Converting them to lower case
//             const utoLC = urduString.toLowerCase();
//             const gtoLC = geoString.toLowerCase();
//         //String similarity using hamming distance algo of natural
//         const l1 = utoLC.length;
//         const l2 = gtoLC.length;
//         if (l1 == l2){
//             const resultofHD = natural.HammingDistance(utoLC, gtoLC, false)
//             console.log(`resultofHD : ${resultofHD}`);
//         }else{
//             console.log(`String Lengths are not equal Moving to jaro-winkler`)
//         }
//         //// String similarity using npm i jaro-winkler
//         const jaroWinklerSimilarity =  distance(utoLC, gtoLC, { caseSensitive: false });
//         console.log(`jaroWinklerSimilarity (0-1): ${jaroWinklerSimilarity}`)



//               await browser.close();
//             } catch (e) {
//               console.log(`Error while fetching workable job titles ${e.message}`);
//             }
//           })();
//       await browser.close();
//     } catch (e) {
//       console.log(`Error while fetching workable job titles ${e.message}`);
//     }
//   })();
// })
const axios = require("axios").default;

console,log(`urduRoute working now`)
  const { data } =  axios.get(`https://www.samaa.tv/news/40004228/`);
  console.log(`data of webpage : ${data}`)
})
module.exports = router