import express from "express"
import {publicAccess, customerBoard, salesAnalyticsBoard, deliveryDriverBoard, restaurantOwnerBoard, thirdPartyDeveloperBoard, getCurrentUser} from "../controllers/user.controller.js"
import {verifyToken} from "../middlewares/authJwt.js"
import { isCustomer, isDeliveryDriver, isRestaurantOwner, isSalesTeam, isThirdPartyDeveloper } from "../middlewares/role.middleware.js"

const router = express.Router()

router.get("/", publicAccess)
router.get("/customer", verifyToken, isCustomer,customerBoard)
router.get("/delivery-driver", verifyToken, isDeliveryDriver,deliveryDriverBoard)
router.get("/sales-analytics", verifyToken, isSalesTeam ,salesAnalyticsBoard)
router.get("/restaurant-owner",verifyToken, isRestaurantOwner,restaurantOwnerBoard)
router.get("/third_party_dev", verifyToken, isThirdPartyDeveloper, thirdPartyDeveloperBoard)

//user profile
router.get("/me", verifyToken, getCurrentUser)
export default router