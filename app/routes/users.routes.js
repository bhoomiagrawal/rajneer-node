const express = require('express');
// const { getAllUsers, createUser } = require('../controllers/userController');
// const authorize = require('../../middleware/authorization');

const router = express.Router();

// router.get('/', authorize(), getAllUsers); // List all users
// router.post('/', authorize(['admin']), createUser); // Create user (admin only)

module.exports = router;
