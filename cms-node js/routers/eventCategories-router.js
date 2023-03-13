const { Router } = require("express");
const {createEventsCategories,updateEventsCategories,getAllEventsCategories,deleteEventsCategories, getAllEventsCategoriesWithAllEvents} = require("../controllers/eventCategories-controller")
const router = Router();
const { getAllEventsByCategoryId } = require("../controllers/eventCategories-controller")
const token = require('../middlewares/authentication_middleware');

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })


  // All Routes of Contents 
  router.get( "/", token.authenticationMiddleware, async(req, res) => {
    let data = await getAllEventsCategories(req,res)
    res.send(data)
  })


  router.post('/createEventCategories', token.authenticationMiddleware, async (req, res) => {
     let data = await createEventsCategories(req,res)
     res.send(data)
  })

  router.patch('/updateEventCategories/:categoryId', token.authenticationMiddleware, async (req, res) => {
    let data = await updateEventsCategories(req,res)
    res.send(data)
  })

  router.delete('/deleteEventCategories/:categoryId', token.authenticationMiddleware, async(req, res) => {
    let data = await deleteEventsCategories(req,res)
    res.send(data)
  })

  router.get('/getAllEventsByCategoryId/:Id', token.authenticationMiddleware, async(req, res) => {
    let data = await getAllEventsByCategoryId(req,res)
    res.send(data)
  })

  router.get('/getAllEventCatwithAllEvents', token.authenticationMiddleware, async (req, res) => {
    let data = await getAllEventsCategoriesWithAllEvents(req,res)
    res.send(data)
 })
module.exports = router;



