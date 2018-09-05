const express = require('express');
const cors = require('cors');
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;


const app = express();

const PORT = 4000;
const user = "dev_academy";
const password = "Xqj2jdzT1sRfGyEY";

const uri = `mongodb+srv://dev_academy:${password}@kanslodagbok-g1obv.mongodb.net/users?retryWrites=true`

app.use(express.static('kanslojagboken/public'));
app.use(express.urlencoded({ extended: false }));

app.use(cors());

/*
MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
  const collection = client.db("users").collection("userdata");
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    
  });
  client.close();
});
*/

// GET all userdata
app.get('/userdata', (req, res, err) => {
  MongoClient.connect(uri,{ useNewUrlParser: true },async function(err, client) {
    assert.equal(null, err);
    const collection = client.db("users").collection("userdata");
    collection.find({}).toArray(function(err, docs) {
      console.log("Found the following records");
      console.log(docs)
      res.send(docs);
  });
  });
});

// PATCH to /update with req.body.id
app.patch('/update', (req, res, err) => {
  MongoClient.connect(uri,{ useNewUrlParser: true },async function(err, client) {
    assert.equal(null, err);
    const collection = client.db("users").collection("userdata");
    collection.find(ObjectId(req.body.id)).toArray(function(err, docs) {
        console.log("Found the following records");
        console.log(docs)
        res.send(docs);
    
  
    })
  })
})








app.listen(PORT);
