const {
  createItems,
  getAllItems,
  getItem,
  deleteItem,
  updateItem,
} = require("../activities");
const uuid = require("uuid");

//getting all events
const getAllEvents = async (req, res) => {
  try {
    var params = {
      TableName: "Events",
    };
    const data = await getAllItems(params);
    res.status(200).json({ data }); //calling getAllevents function
  } catch (error) {
    console.log(error);
  }
};

//create events
const createEvents = async (req, res) => {
  try {
    var params = {
      TableName: "Events",
      Item: {
        eventid: uuid.v4(),
        ...req.body,
      },
    };
    await createItems(params);
    res.status(200).json({ params });
  } catch (error) {
    console.log(error);
  }
};

//get user
const getEvent = async (req, res) => {
  try {
    const { eventid: eventid } = req.params;
    var params = {
      TableName: "Events",
      Key: {
        eventid: eventid,
      },
    };
    const data = await getItem(params);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};

//delete events
const deleteEvent = async (req, res) => {
  try {
    const { eventid: eventid } = req.params;
    var params = {
      TableName: "Events",
      Key: {
        eventid: eventid,
      },
    };
    const data = await deleteItem(params);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};

//edit events
const editEvent = async (req, res) => {
  try {
    const { eventid: eventid } = req.params;
    var params = {
      TableName: "Events",
      Key: {
        eventid: eventid,
      },
      UpdateExpression: "set key = :e",
      ExpressionAttributeValues: {
        ":e": req.body,
      },
      ReturnValues: "UPDATED_NEW",
    };
    const data = await updateItem(params);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllEvents,
  createEvents,
  getEvent,
  deleteEvent,
  editEvent,
};
