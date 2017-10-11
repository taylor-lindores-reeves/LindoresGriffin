const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/', messageController.homePage); // has to come before so can be rendered
router.get('/contact', messageController.contactPage);
router.post('/contact', messageController.sendMessage);

module.exports = router;