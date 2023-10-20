const express = require("express");
const router = express.Router();
const stripe = require("../controllers/stripe");

router.post("/createCheckout", stripe.createCheckoutSession);
router.post("/createPortal", stripe.createPortal);
router.post("/webhook", stripe.webhook);
router.post("/getCustomerId/:sessionId", stripe.getCustomerId);

module.exports = router;
