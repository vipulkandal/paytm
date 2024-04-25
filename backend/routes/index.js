const express = require('express');
const userRouter = require('./user');

const router = express.Router();

router.use('/user', userRouter); // Separate routes for user only

module.exports = router;