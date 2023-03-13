const {Router} = require("express");
const router = Router();

router.get("/", (req, res) => res.status(200).json("Welcome!"));
router.use("/auth", require("./auth-router"))
router.use("/contents", require("./contents-router"))
router.use("/events",require("./events-router"))
router.use("/eventCategories",require("./eventCategories-router"))
router.use("/brands", require("./brands-router"))
router.use("/feeds", require("./feeds-router"))
router.use("/media", require("./media-router"))
router.use("/podcasts", require("./podcasts-router"))
router.use("/tiktok", require("./tiktok-router"))
router.use("/nfts", require("./nfts-router"))
module.exports = router;