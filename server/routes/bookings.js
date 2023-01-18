const express=require('express')
const router=express.Router();
const {getAllBookings,createBookings,getBookings,deleteBookings}=require('../controllers/bookings')


router.route('/').get(getAllBookings).put(createBookings);
router.route('/:bookingid').get(getBookings).delete(deleteBookings)

module.exports=router;