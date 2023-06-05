const express = require('express');
const { registerUser, authUser, allUsers } = require('../controllers/userController');
const {protect} = require('../middlewares/authMiddleWare');
const {roleMiddleWare} = require('../middlewares/roleMiddleWare');

const router = express.Router();

router.route('/').post(registerUser).get(protect, /* roleMiddleWare(["Администратор"]), */ allUsers);
router.post('/login', authUser);
module.exports = router;