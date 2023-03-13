const { Router } = require("express");
const { getAllBrands, createBrands, updateBrands, deleteBrands } = require("../controllers/brands-controller");
const router = Router();
const token = require('../middlewares/authentication_middleware');

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })


  // All Routes of Contents 
  router.get('/', token.authenticationMiddleware, async(req, res) => {
    let data = await getAllBrands(req,res)
    res.send(data)
  })

  router.post('/createBrand', token.authenticationMiddleware, async (req, res) => {
     let data = await createBrands(req,res)
     res.send(data)
  })

  router.patch('/updateBrand/:brandId',token.authenticationMiddleware, async (req, res) => {
    let data = await updateBrands(req,res)
    res.send(data)
  })

  router.delete('/deleteBrand/:brandId', token.authenticationMiddleware, async(req, res) => {
    let data = await deleteBrands(req,res)
    res.send(data)
  })

module.exports = router;



