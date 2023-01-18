const { createItems, getAllItems, getItem, deleteItem } = require('../activities')
const uuid = require('uuid')


//getting all users
const getAllUsers = async (req, res) => {
  try {
    var params = {
      TableName: "Logins",
    };
    const data = await getAllItems(params);
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
  }
}


//create user
const createUsers = async (req, res) => {
  try {
    var params = {
      TableName: "Logins",
      Item: {
        "ownerid": uuid.v4(),
        "ownermail": req.body.ownermail,
        ...req.body
      }
    };
    await createItems(params);
    res.status(200).json({ params })
  } catch (error) {
    console.log(error);
  }
}



//get user
const getUser = async (req, res) => {
  try {
    const { ownermail: ownermail } = req.params;
    var params = {
      TableName: "Logins",
      Key: {
        ownermail: ownermail
      }
    };
    const data = await getItem(params);
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
  }

}

//delete logins
const deleteLogins = async (req, res) => {
  try {
    const { ownermail: ownermail } = req.params;
    var params = {
      TableName: "Logins",
      Key: {
        ownermail: ownermail
      }
    }
    const data = await deleteItem(params);
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllUsers,
  createUsers,
  getUser,
  deleteLogins
}