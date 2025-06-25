import express from "express"
import { signup, signin } from "../controllers/auth.controller.js"
import {checkDuplicateUsernameOrEmail, checkRolesIsValid} from "../middlewares/verifySignUp.js"

const router = express.Router()
router.post("/signup", [checkDuplicateUsernameOrEmail, checkRolesIsValid], signup)
router.post("/signin", signin)

export default router