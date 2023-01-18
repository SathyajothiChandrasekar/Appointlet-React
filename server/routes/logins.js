const express = require('express')
const router = express.Router();
const {getAllUsers,createUsers,getUser,deleteLogins} =  require('../controllers/logins')

router.route('/').get(getAllUsers).put(createUsers);
router.route('/:ownermail').get(getUser).delete(deleteLogins)

module.exports = router;