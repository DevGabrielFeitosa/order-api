const express = require("express")
const router = express.Router()

const orderController = require("../controllers/orderController")

router.post("/", orderController.createOrder)
router.get("/list", orderController.listOrders)
router.get("/:orderId", orderController.getOrderById)

module.exports = router