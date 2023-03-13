const { Router } = require("express");
const inputValidator = require("../middlewares/validate-input");
const { createUserSchema } = require("../util/schemas/auth.schema");
const {
  createUserController,
  currentUserController,
  loginUserController,
} = require("../controllers/auth-controller");
const {
  authenticationMiddleware,
} = require("../middlewares/authentication_middleware");

const router = Router();

router.post("/sign-up", inputValidator(createUserSchema), createUserController);
router.post("/sign-in", loginUserController);
router.post("/me", authenticationMiddleware, currentUserController);

module.exports = router;
