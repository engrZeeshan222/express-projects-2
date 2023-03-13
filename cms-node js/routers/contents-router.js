const { Router } = require("express");
const {createContents , getAllContents, deleteContents, updateContents} = require("../controllers/contents-controller")
const router = Router();
const token = require('../middlewares/authentication_middleware');

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })


  // All Routes of Contents 
  router.get('/',token.authenticationMiddleware , async(req, res) => {
    let data = await getAllContents(req,res)
    res.send(data)
  })

  router.post('/createContent',token.authenticationMiddleware, async (req, res) => {
     let data = await createContents(req,res)
     res.send(data)
  })

  router.patch('/updateContent/:id',token.authenticationMiddleware, async (req, res) => {
    let data = await updateContents(req,res)
    res.send(data)
  })

  router.delete('/deleteContent/:id',token.authenticationMiddleware, async(req, res) => {
    let data = await deleteContents(req,res)
    res.send(data)
  })

module.exports = router;



