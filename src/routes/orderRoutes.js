const express = require("express")
const router = express.Router()

const orderController = require("../controllers/orderController")
const { authenticateToken } = require("../middlewares/authMiddlewares");

router.post("/", authenticateToken, orderController.createOrder)
router.get("/list", authenticateToken, orderController.listOrders)
router.get("/:orderId", authenticateToken, orderController.getOrderById)
router.put("/:orderId", authenticateToken, orderController.updateOrder)
router.delete("/:orderId", authenticateToken, orderController.deleteOrder)

module.exports = router