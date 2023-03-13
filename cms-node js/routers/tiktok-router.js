const { Router } = require("express");
const { getAllTiktok, createTiktok, updateTiktok, deleteTiktok } = require("../controllers/tiktok-controller");
const router = Router();
const token = require('../middlewares/authentication_middleware');

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })


  // All Routes of Contents 
  router.get('/', token.authenticationMiddleware,  async(req, res) => {
    let data = await getAllTiktok(req,res)
    res.send(data)
  })

  router.post('/createTiktok',token.authenticationMiddleware, async (req, res) => {
     let data = await createTiktok(req,res)
     res.send(data)
  })

  router.patch('/updateTiktok/:tiktokId',token.authenticationMiddleware, async (req, res) => {
    let data = await updateTiktok(req,res)
    res.send(data)
  })

  router.delete('/deleteTiktok/:tiktokId',token.authenticationMiddleware, async(req, res) => {
    let data = await deleteTiktok(req,res)
    res.send(data)
  })

module.exports = router;



