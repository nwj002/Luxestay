const express = require('express');
const { processPayment } = require('../controller/paymentController');
const { authGuard } = require('../middleware/authGuard');

const router = express.Router();

// User Routes
router.post('/', authGuard, processPayment);

module.exports = router;
