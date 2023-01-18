const { createItems, getAllItems, getItem, deleteItem } = require('../activities')
const uuid = require('uuid');


//getting all customers
const getAllBookings = async (req, res) => {
  try {
    var params = {
      TableName: "Bookings",
    };
    const data = await getAllItems(params)
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
  }
}


//create bookings
const createBookings = async (req, res) => {
  try {
    var params = {
      TableName: "Bookings",
      Item: {
        "bookingid": uuid.v4(),
        ...req.body
      }
    };
    await createItems(params);
    res.status(200).json({ params })
  } catch (error) {
    console.log(error);
  }
}


//get single customer
const getBookings = async (req, res) => {
  try {
    const { bookingid: bookingid } = req.params;
    var params = {
      TableName: "Bookings",
      Key: {
        bookingid: bookingid
      }
    };
    const data = await getItem(params);
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
  }
}

//delete events
const deleteBookings = async (req, res) => {
  try {
    const { bookingid: bookingid } = req.params;
    var params = {
      TableName: "Bookings",
      Key: {
        bookingid: bookingid
      }
    }
    const data = await deleteItem(params);
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllBookings,
  createBookings,
  getBookings,
  deleteBookings
}
