const { Router } = require("express");
const {createEvents , getAllEvents, deleteEvents, updateEvents} = require("../controllers/events-controller")
const router = Router();
const token = require('../middlewares/authentication_middleware');

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })


  // All Routes of Contents 
  router.get('/', token.authenticationMiddleware, async(req, res) => {
    let data = await getAllEvents(req,res)
    res.send(data)
  })

  router.post('/createEvent', token.authenticationMiddleware, async (req, res) => {
     let data = await createEvents(req,res)
     res.send(data)
  })

  router.patch('/updateEvent/:id', token.authenticationMiddleware, async (req, res) => {
    let data = await updateEvents(req,res)
    res.send(data)
  })

  router.delete('/deleteEvent/:id', token.authenticationMiddleware, async(req, res) => {
    let data = await deleteEvents(req,res)
    res.send(data)
  })

module.exports = router;



