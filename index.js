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

//TEST DATA

let insert = { 
      "Day1": [
          "Fuck!!!!!!!",
          "Besviken",
          "Frustrerad"
      ],
      "Day2": [
          "Glad",
          "Exhalterad"
      ]
  
};


// GET userdata req.query.id  
app.get('/userdata', (req, res, err) => {
  MongoClient.connect(uri,{ useNewUrlParser: true },async function(err, client) {
    assert.equal(null, err);
    const collection = client.db("users").collection("userdata");
    collection.find(ObjectId(req.query.id)).toArray(function(err, result){
      res.send(result);
    }) 
  client.close();
  });
  
});


app.patch('/newuserdata', async (req, res, err) => {
  let incoming = await JSON.parse(req.body.data);

  MongoClient.connect(uri,{ useNewUrlParser: true },async function(err, client) {
    assert.equal(null, err);
    const collection = client.db("users").collection("userdata") 
    collection.insert(incoming, function(err, result){
      res.send(result);
    })
  
  client.close();
  });
  
});

//PATCH update userdata, req.body.id as identifier, req.body.data as new data



app.patch('/updateuserdata', async (req, res, err) => {
  let incoming = await JSON.parse(req.body.data);
  let date = await new Date();

date=date.toString()
date=date.split(" ").join("").substr(0,12);


  MongoClient.connect(uri,{ useNewUrlParser: true },async function(err, client) {
    assert.equal(null, err);
    const collection = client.db("users").collection("userdata");
    collection.findOneAndUpdate({$and:[{"_id": ObjectId(req.body.id)}, {"emotionData.date":date}]},{$set:{"emotionData.$.emotions":incoming }},{returnOriginal: false}, function(err, result){
        if(!result["lastErrorObject"]["updatedExisting"] || err){
          res.send("error");
        }else{
          res.send(result);
        }
        
      })
    
    })
  
  client.close();
  });

  app.post('/updateuserdata', async (req, res, err) => {
    let incoming = await JSON.parse(req.body.data);
    let date = await new Date();
  
  date=date.toString()
  date=date.split(" ").join("").substr(0,12);
  date="FriSep062018";
  objEmotionData = {date:date,emotions:incoming}
  
    MongoClient.connect(uri,{ useNewUrlParser: true },async function(err, client) {
      assert.equal(null, err);
      const collection = client.db("users").collection("userdata");
      collection.findOneAndUpdate({"_id": ObjectId(req.body.id)},{$push:{"emotionData":objEmotionData }},{returnOriginal: false}, function(err, result){
         
          res.send(result);
        })
      
      })
    
    client.close();
    });
    
  



//
// PATCH to /update with req.body.id
app.patch('/update', (req, res, err) => {
  MongoClient.connect(uri,{ useNewUrlParser: true },async function(err, client) {
    assert.equal(null, err);
    const collection = client.db("users").collection("userdata");
    collection.find(ObjectId(req.body.id)).toArray(function(err, docs) {
        console.log("Found the following records");
        console.log(docs)
        res.send(docs);
    
  
    });
    client.close();
  });
});








app.listen(PORT);
