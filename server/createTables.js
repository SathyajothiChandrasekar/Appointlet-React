const AWS=require("aws-sdk");

AWS.config.update({
  region: "ap-south-1",
  endpoint: "http://localhost:8000"
});

var dynamodb=new AWS.DynamoDB();

var params={
  TableName : "Logins",
  KeySchema:[
    {AttributeName: "ownermail",KeyType: "HASH"}
  ],
  AttributeDefinitions: [       
    { AttributeName: "ownermail", AttributeType: "S" }
  ],
  ProvisionedThroughput: {       
    ReadCapacityUnits: 10, 
    WriteCapacityUnits: 10,
}
};


// var params={
//   TableName : "Events",
//   KeySchema:[
//     {AttributeName: "eventid",KeyType: "HASH"}
//   ],
//   AttributeDefinitions: [       
//     { AttributeName: "eventid", AttributeType: "S" }
//   ],
//   ProvisionedThroughput: {       
//     ReadCapacityUnits: 10, 
//     WriteCapacityUnits: 10
// }
// };

// var params={
//     TableName : "Bookings",
//     KeySchema:[
//       {AttributeName: "bookingid",KeyType: "HASH"}
//     ],
//     AttributeDefinitions: [       
//       { AttributeName: "bookingid", AttributeType: "S" }
//     ],
//     ProvisionedThroughput: {       
//       ReadCapacityUnits: 10, 
//       WriteCapacityUnits: 10
//   }
// };

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
  });
  