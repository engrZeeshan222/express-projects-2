const { Router } = require("express");
const { getAllPodcasts, createPodcasts, updatePodcasts, deletePodcasts } = require("../controllers/podcasts-controller");
const router = Router();
const token = require('../middlewares/authentication_middleware');

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })


  // All Routes of Contents 
  router.get('/', token.authenticationMiddleware, async(req, res) => {
    let data = await getAllPodcasts(req,res)
    res.send(data)
  })

  router.post('/createPodcasts',token.authenticationMiddleware, async (req, res) => {
     let data = await createPodcasts(req,res)
     res.send(data)
  })

  router.patch('/updatePodcasts/:podcastsId', token.authenticationMiddleware, async (req, res) => {
    let data = await updatePodcasts(req,res)
    res.send(data)
  })

  router.delete('/deletePodcasts/:podcastsId', token.authenticationMiddleware, async(req, res) => {
    let data = await deletePodcasts(req,res)
    res.send(data)
  })

module.exports = router;



