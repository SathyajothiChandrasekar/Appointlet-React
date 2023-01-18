const express = require('express')
const router = express.Router();
const { getAllEvents, createEvents, getEvent, deleteEvent, editEvent } = require('../controllers/events')

router.route('/').get(getAllEvents).post(createEvents);
router.route('/:eventid').get(getEvent).delete(deleteEvent).put(editEvent);

module.exports = router;