const { Router } = require("express");
const { getAllNfts, createNfts, updateNfts, deleteNfts } = require("../controllers/nfts-controller");
const router = Router();
const token = require('../middlewares/authentication_middleware');

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })


  // All Routes of Contents 
  router.get('/', token.authenticationMiddleware, async(req, res) => {
    let data = await getAllNfts(req,res)
    res.send(data)
  })

  router.post('/createNfts',token.authenticationMiddleware, async (req, res) => {
     let data = await createNfts(req,res)
     res.send(data)
  })

  router.patch('/updateNfts/:nftsId',token.authenticationMiddleware, async (req, res) => {
    let data = await updateNfts(req,res)
    res.send(data)
  })

  router.delete('/deleteNfts/:nftsId', token.authenticationMiddleware, async(req, res) => {
    let data = await deleteNfts(req,res)
    res.send(data)
  })

module.exports = router;



