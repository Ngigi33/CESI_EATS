import { hasRole } from "./authJwt.js";

export const isCustomer = hasRole("customer")
export const isDeliveryDriver = hasRole("delivery_driver")
export const isRestaurantOwner = hasRole("restaurant_owner")
export const isSalesTeam = hasRole("sales_team")
export const isThirdPartyDeveloper = hasRole("third_party_developer")