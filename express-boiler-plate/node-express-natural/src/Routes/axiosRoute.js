const express = require('express')
const router = express.Router()
const axios = require("axios").default;
const cheerio = require("cheerio");

//nodecron route
router.get('/axios', (req, res) => {
        console.log(`welcome to axios`)
let link = '';
        let myFunction = async ( ) => {
          try {
            const  data  =   await axios.get(`https://www.samaa.tv/news/40004228/`);
            console.log(`data of webpage : ${data}`)
            let html = cheerio.load(data);
            console.log(`html : ${html}`)
            return html;
          }catch(e){
            console.log(e)
          }
  
        };

 myFunction();
  })
  module.exports = router

    
