import express from "express"
import {publicAccess, customerBoard, salesAnalyticsBoard, deliveryDriverBoard, restaurantOwnerBoard} from "../controllers/user.controller.js"
import {verifyToken, hasRole} from "../middlewares/authJwt.js"

const router = express.Router()

router.get("/public", publicAccess)
router.get("/customer", [verifyToken, hasRole("customer")],customerBoard)
router.get("/delivery-driver", [verifyToken, hasRole("delivery_driver")],deliveryDriverBoard)
router.get("/sales-analytics", [verifyToken, hasRole("sales_analytics")],salesAnalyticsBoard)
router.get("/restaurant-owner",[verifyToken, hasRole("restaurant_owner")],restaurantOwnerBoard)

export default router