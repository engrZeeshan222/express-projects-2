const { Router } = require("express");
const { getAllMedia, createMedia, updateMedia, deleteMedia } = require("../controllers/media-controller");
const router = Router();
const token = require('../middlewares/authentication_middleware');

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })


  // All Routes of Contents 
  router.get('/',  token.authenticationMiddleware, async(req, res) => {
    let data = await getAllMedia(req,res)
    res.send(data)
  })

  router.post('/createMedia',token.authenticationMiddleware, async (req, res) => {
     let data = await createMedia(req,res)
     res.send(data)
  })

  router.patch('/updateMedia/:mediaId',token.authenticationMiddleware, async (req, res) => {
    let data = await updateMedia(req,res)
    res.send(data)
  })

  router.delete('/deleteMedia/:mediaId',token.authenticationMiddleware, async(req, res) => {
    let data = await deleteMedia(req,res)
    res.send(data)
  })

module.exports = router;



