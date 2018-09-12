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

        GET /hello                    to get a hello phrase dependent on time of day
        GET /userdata with            req.query.id as userid, gets all data for that user
        GET /userdatabydate           emotion freq within timeperiod, req.query.id and (ex: 20180702 as req.query.datestart and 20180830 as req.query.dateend)
        GET /userdatabydatewithcolor  emotion freq within timeperiod, req.query.id and (ex: 20180702 as req.query.datestart and 20180830 as req.query.dateend) with corresponding color
        POST /newuser                 req.body.data as first emotion array   -----------EDIT REQUIRED-------------
        PATCH /updateuserdata         (for updating data) try this first on error try the next, req.body.data as emotion array req.body.id as userid
        POST /updateuserdata          (for new data for that day) req.body.data as emotion array req.body.id as userid
        PATCH /updateusercolor        req.body.id and req.body.data, for updating the colors for a user

*/


app.get('/hello', async (req, res, err) => {
  const date = new Date();
  const hours = date.getHours();

  MongoClient.connect(uri,{ useNewUrlParser: true },async function(err, client) {
    assert.equal(null, err);
    const collection = client.db("storage").collection("helloPhrases");
    let result = await collection.findOne(ObjectId("5b9790acc0f58e78ec432a2b"))
    result = result.helloPhrase
    
    const random = Math.floor(Math.random()*2);
    if(hours>=4 && hours<10){
      const newHelloArray = result.slice(0, 2)
      res.send([newHelloArray[random]])
    }else if(hours>=10 && hours<16){
     const newHelloArray= result.slice(2, 4)
      res.send([newHelloArray[random]])
    }else if(hours>=16 && hours<22){
      const newHelloArray= result.slice(4, 6)
      res.send([newHelloArray[random]])
    }else if(hours>=22 && hours<4){
      const newHelloArray= result.slice(6, 8)
      res.send([newHelloArray[random]])
    }

  client.close();
  });
  
  

  
  
  
})
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


// GET emotion freq within timeperiod, req.query.id and (ex: 20180702 as req.query.datestart and 20180830 as req.query.dateend)
app.get('/userdatabydate', (req, res, err) => {
  const startYear = req.query.datestart.substr(0,4);
  const startMonth = req.query.datestart.substr(4,2);
  const startDay = req.query.datestart.substr(6,2);
  const start = new Date(startYear,startMonth-1,startDay)
  const endYear = req.query.dateend.substr(0,4);
  const endMonth = req.query.dateend.substr(4,2);
  const endDay = req.query.dateend.substr(6,2);
  const end = new Date(endYear,endMonth-1,endDay)
  
  
  MongoClient.connect(uri,{ useNewUrlParser: true },async function(err, client) {
    assert.equal(null, err);
    const collection = client.db("users").collection("userdata");
    let result = await collection.findOne(ObjectId(req.query.id))
    result = result.emotionData;
    result = result.filter((date)=>{
      if(date.date >= start && date.date <= end){
        return date;
      }
      
    })
    result = result.reduce((accumulatedArray,emotion)=>{
      accumulatedArray = accumulatedArray.concat(emotion["emotions"]);
      return accumulatedArray;
    },[])

    result = result.reduce((accumulatedObject,emotion)=>{
      if(accumulatedObject[emotion]){
        let value = accumulatedObject[emotion];
        value = value+1;
        accumulatedObject[emotion]=value;
      }else{
        accumulatedObject[emotion]=1
      }
      return accumulatedObject;
      
    },{})
    res.send(result);

  client.close();
  });
  
});

// GET emotion freq within timeperiod, req.query.id and (ex: 20180702 as req.query.datestart and 20180830 as req.query.dateend)
app.get('/userdatabydatewithcolor', (req, res, err) => {
  const startYear = req.query.datestart.substr(0,4);
  const startMonth = req.query.datestart.substr(4,2);
  const startDay = req.query.datestart.substr(6,2);
  const start = new Date(startYear,startMonth-1,startDay)
  const endYear = req.query.dateend.substr(0,4);
  const endMonth = req.query.dateend.substr(4,2);
  const endDay = req.query.dateend.substr(6,2);
  const end = new Date(endYear,endMonth-1,endDay)
  
  
  MongoClient.connect(uri,{ useNewUrlParser: true },async function(err, client) {
    assert.equal(null, err);
    const collection = client.db("users").collection("userdata");
    let result = await collection.findOne(ObjectId(req.query.id))
    let color = result.colors;
    result = result.emotionData;
   
   
    result = result.filter((date)=>{
      if(date.date >= start && date.date <= end){
        return date;
      }
      
    })
    result = result.reduce((accumulatedArray,emotion)=>{
      accumulatedArray = accumulatedArray.concat(emotion["emotions"]);
      return accumulatedArray;
    },[])

    result = result.reduce((accumulatedObject,emotion)=>{
      if(accumulatedObject[emotion]){
        let value = accumulatedObject[emotion][0];
        value = value+1;
        accumulatedObject[emotion]=[value];
      }else{
        accumulatedObject[emotion]=[1]
      }
      
      return accumulatedObject;
      
    },{})
    


    Object.keys(result).forEach((i) =>{
      Object.keys(color).forEach((j) =>{
        let hej = color[j][Object.keys(color[j])];
        if(hej.includes(i)){
          result[i].push(Object.keys(color[j])[0])
        }
      })
    })

    res.send(result);

  client.close();
  });
  
});

app.post('/newuser', async (req, res, err) => {
  
  let incoming = req.body.data;
  let date = await new Date();
  date.setHours(0,0,0,0);
  let newUser = {emotionData:[{date:date,emotions:incoming}],colors:{red:[],green:[],blue:[],orange:[],yellow:[],pink:[],turquoise:[],purple:[]}}

  MongoClient.connect(uri,{ useNewUrlParser: true },async function(err, client) {
    assert.equal(null, err);
    const collection = client.db("users").collection("userdata") 
    collection.insertOne(newUser, function(err, result){
      res.send(result);
    })
  
  client.close();
  });
  
});

//PATCH update userdata, req.body.id as identifier, req.body.data as new data



app.patch('/updateuserdata', async (req, res, err) => {
  
  let date = await new Date();
  date.setHours(0,0,0,0);

  MongoClient.connect(uri,{ useNewUrlParser: true },async function(err, client) {
    assert.equal(null, err);
    const collection = client.db("users").collection("userdata");
    collection.findOneAndUpdate({$and:[{"_id": ObjectId(req.body.id)}, {"emotionData.date":date}]},{$set:{"emotionData.$.emotions":req.body.data }},{returnOriginal: false},function(err,result){
      if(result.lastErrorObject.updatedExisting){
        res.send(result);
      }else{
        res.send("error");
      }
    }) 
      client.close();
    })
  
  });

  app.post('/updateuserdata', async (req, res, err) => {
  
    let date = await new Date();
    date.setHours(0,0,0,0);
    let objEmotionData = {date:date,emotions:req.body.data}
  
    MongoClient.connect(uri,{ useNewUrlParser: true },async function(err, client) {
      assert.equal(null, err);
      const collection = client.db("users").collection("userdata");
      collection.findOneAndUpdate({"_id": ObjectId(req.body.id)},{$push:{"emotionData":objEmotionData }},{returnOriginal: false}, function(err, result){
         
          res.send(result);
        })
        client.close();
      })
    
    
    });


    app.patch('/updateusercolor', async (req, res, err) => {
    
      MongoClient.connect(uri,{ useNewUrlParser: true },async function(err, client) {
        assert.equal(null, err);
        const collection = client.db("users").collection("userdata");
        collection.findOneAndUpdate({"_id": ObjectId(req.body.id)},{$set:{"colors":req.body.data }},{returnOriginal: false},function(err,result){
          if(result.lastErrorObject.updatedExisting){
            res.send(result);
          }else{
            res.send("error");
          }
        })
      
        
          client.close();
        })
      
      });
    



//-------------------------------------------------------Script to insert test data ----------------------------------------------------------------

app.get('/posttestdata', async (req, res, error) => {
  
  let random = Math.floor(Math.random()*30)+1;
  let randomM = Math.floor(Math.random()*11);
  let randomY = 2018 //Math.floor(Math.random()*3)+2016;
  let emotionArray = ["Arg","Exhalterad","Glad","Trevlig","Social","Trött","Kaffesugen","Nedstämd","Harmonisk","Kärleksfylld","Orolig","Stressad","Sprallig","JavaScriptig","Intelligent","Nyfiken","Rädd","Snygg","Äcklig"]
  let emotion = [];
  let randomIteration = (Math.floor(Math.random()*5)+1);
  for(let i = 0; i<randomIteration; i++){
    emotion.push(emotionArray[Math.floor(Math.random()*emotionArray.length)])
  }
  
  
  let date = await new Date(randomY,randomM,random);
  date.setHours(0,0,0,0);
  let objEmotionData = {date:date,emotions:emotion}

  MongoClient.connect(uri,{ useNewUrlParser: true },async function(err, client) {
    assert.equal(null, err);
    const collection = client.db("users").collection("userdata");
    collection.findOneAndUpdate({"_id": ObjectId("5b912c3f272a825d807bd24f")},{$push:{"emotionData":objEmotionData }},{returnOriginal: false}, function(err, result){
       if(err){
        error.send(err);
       }else{
        res.send(result);
       }
        
      })
      client.close();
    })
  
  
  });




app.listen(PORT);
