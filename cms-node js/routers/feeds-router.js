const { Router } = require("express");
const { getAllFeeds, createFeeds, updateFeeds, deleteFeeds } = require("../controllers/feeds-controller");
const router = Router();
const token = require('../middlewares/authentication_middleware');

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })


  // All Routes of Contents 
  router.get('/', token.authenticationMiddleware, async(req, res) => {
    let data = await getAllFeeds(req,res)
    res.send(data)
  })

  router.post('/createFeed', token.authenticationMiddleware, async (req, res) => {
     let data = await createFeeds(req,res)
     res.send(data)
  })

  router.patch('/updateFeed/:feedId', token.authenticationMiddleware, async (req, res) => {
    let data = await updateFeeds(req,res)
    res.send(data)
  })

  router.delete('/deleteFeed/:feedId', token.authenticationMiddleware, async(req, res) => {
    let data = await deleteFeeds(req,res)
    res.send(data)
  })

module.exports = router;



