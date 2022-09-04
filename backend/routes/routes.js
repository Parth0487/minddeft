var express = require('express');
var router = express.Router();
var userController = require('../src/controllers/user.controller');

var authHelper = require('../src/utils/auth.middleware')

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/getUsersWithoutMe', authHelper.verifyToken, userController.getUsersWithoutMe)

router.get('/getFriends', authHelper.verifyToken, userController.getFriends)
router.get('/getMutualFriends/:id', authHelper.verifyToken, userController.getMutualFriends)
router.get('/getProfile', authHelper.verifyToken, userController.getProfile)

router.get('/getRequests', authHelper.verifyToken, userController.getRequests)

router.post('/sendRequest', authHelper.verifyToken, userController.sendFriendRequest)

router.put('/updateRequest/:id', authHelper.verifyToken, userController.updateRequest)

router.get('/getSuggestions', authHelper.verifyToken, userController.getSuggestions)

module.exports = router;
