const express = require('express');
const cors = require('cors');
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');




const app = express();

const PORT = 4000;
const user = "dev_academy";
const password = "Xqj2jdzT1sRfGyEY";

const uri = `mongodb+srv://dev_academy:${password}@kanslodagbok-g1obv.mongodb.net/users?retryWrites=true`

app.use(express.static('kanslojagboken/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

/* 
        Documentation

        GET /userdata with req.query.id as userid, gets all data for that user
        GET /userdatabydate TODO
        POST /newuser with req.body.data as first emotion array
        PATCH /updateuserdata (for updating data) try this first on error try the next, req.body.data as emotion array req.body.id as userid
        POST /updateuserdata (for new data for that day) req.body.data as emotion array req.body.id as userid

*/


// GET userdata req.query.id  
app.get('/userdata', async (req, res, err) => {
  MongoClient.connect(uri,{ useNewUrlParser: true },async function(err, client) {
    assert.equal(null, err);
    const collection = client.db("users").collection("userdata");
    let result = await collection.findOne(ObjectId(req.query.id))
    res.send(result);
  client.close();
  });
  
});


// GET userdata req.query.id by date
app.get('/userdatabydate', (req, res, err) => {
  MongoClient.connect(uri,{ useNewUrlParser: true },async function(err, client) {
    assert.equal(null, err);
    const collection = client.db("users").collection("userdata");
    collection.find(ObjectId(req.query.id)).toArray(function(err, result){
      res.send(JSON.stringify(result));
    }) 
  client.close();
  });
  
});

app.post('/newuser', async (req, res, err) => {
  
  let incoming = await JSON.parse(JSON.stringify(req.body.data));
  console.log(incoming);
  let date = await new Date();
  date=date.toString().split(" ").join("").substr(0,12);
  let newUser = {emotionData:[{date:date,emotions:[incoming]}],colors:{0:[],1:[],2:[],3:[],4:[],5:[],6:[],7:[]}}

  MongoClient.connect(uri,{ useNewUrlParser: true },async function(err, client) {
    assert.equal(null, err);
    const collection = client.db("users").collection("userdata") 
    collection.insert(newUser, function(err, result){
      res.send(JSON.stringify(result));
    })
  
  client.close();
  });
  
});

//PATCH update userdata, req.body.id as identifier, req.body.data as new data



app.patch('/updateuserdata', async (req, res, err) => {
  
  console.log(req.body.data);
  let date = await new Date();

date=date.toString()
date=date.split(" ").join("").substr(0,12);
console.log(date);


  MongoClient.connect(uri,{ useNewUrlParser: true },async function(err, client) {
    assert.equal(null, err);
    const collection = client.db("users").collection("userdata");
    collection.findOneAndUpdate({$and:[{"_id": ObjectId(req.body.id)}, {"emotionData.date":date}]},{$set:{"emotionData.$.emotions":req.body.data }},{returnOriginal: false},function(err,result){
      console.log(result);
      if(result.lastErrorObject.updatedExisting){
        res.send(JSON.stringify(result));
      }else{
        res.send(JSON.stringify("error"));
      }
    })
  
    
      client.close();
    })
  
  });

  app.post('/updateuserdata', async (req, res, err) => {
    let date = await new Date();
  
  date=date.toString()
  date=date.split(" ").join("").substr(0,12);
  objEmotionData = {date:date,emotions:req.body.data}
  
    MongoClient.connect(uri,{ useNewUrlParser: true },async function(err, client) {
      assert.equal(null, err);
      const collection = client.db("users").collection("userdata");
      collection.findOneAndUpdate({"_id": ObjectId(req.body.id)},{$push:{"emotionData":objEmotionData }},{returnOriginal: false}, function(err, result){
         
          res.send(JSON.stringify(result));
        })
        client.close();
      })
    
    
    });








app.listen(PORT);
