const express = require('express')
const router = express.Router()
const cron = require('node-cron');

//nodecron route
router.get('/nodecron', (req, res) => {
      try {
        console.log(`welcome to nodecron`)
            // Using Node Cron
            // Do whatever you want in here. Send email, Make  database backup or download data.
            cron.schedule('2 * * * * *', () => {
                console.log('running a task every minute');
              });
      } catch (e) {
        console.log(`Error while fetching workable job titles ${e.message}`);
      }
  })
  module.exports = router

    
