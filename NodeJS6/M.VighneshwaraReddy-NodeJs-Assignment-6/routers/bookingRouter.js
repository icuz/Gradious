const express = require('express');
const bookingController = require('../controller/bookingController.js');

const router = express.Router();
//to fetch all the cards from the table
router.get('/', bookingController.getAllBookings);

//to fetch the data by id
router.get('/:id', bookingController.getBookingById);

//to create a new card
router.post('/', bookingController.createBooking);

//to update the card
router.put('/:id', bookingController.updateBooking);

//to delete the card
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;