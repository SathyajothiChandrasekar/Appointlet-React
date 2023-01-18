var AWS = require("aws-sdk");
AWS.config.update({
  region: "ap-south-1",
  endpoint: "http://localhost:8000"
});
var docClient = new AWS.DynamoDB.DocumentClient();

//create Items
const createItems = async (params) =>{
    try{
        await docClient.put(params).promise();
     }
     catch(error){
        console.log(error);
    }  
}


//get all items in a table
const getAllItems = async (params) =>{
    try{
        return await docClient.scan(params).promise();
    }catch(error){
        console.log(error);
    }
}


//get single item
const getItem = async(params) =>{
    try{
       return await docClient.get(params).promise()
    }
    catch(error){
        console.log(error);
    }
}


//delete a item
const deleteItem = async(params) =>{
    try{
     return await docClient.delete(params).promise();
    }catch(error){
        console.log(error);
    }
}


//update or edit an item
const updateItem = async (params) => {
    try{
     return await docClient.update(params).promise();
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
   createItems,
   getAllItems,
   getItem,
   deleteItem,
   updateItem
}