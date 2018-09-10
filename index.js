const express = require("express");
const cors = require("cors");
const assert = require("assert");
const ObjectId = require("mongodb").ObjectID;
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const app = express();

const PORT = 4000;
const user = "dev_academy";
const password = "Xqj2jdzT1sRfGyEY";

const uri = `mongodb+srv://dev_academy:${password}@kanslodagbok-g1obv.mongodb.net/users?retryWrites=true`;

app.use(express.static("kanslojagboken/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

/* 
        Documentation

        GET /userdata with        req.query.id as userid, gets all data for that user
        GET /userdatabydate       emotion freq within timeperiod, req.query.id and (ex: 20180702 as req.query.datestart and 20180830 as req.query.dateend)
        POST /newuser    with     req.body.data as first emotion array
        PATCH /updateuserdata     (for updating data) try this first on error try the next, req.body.data as emotion array req.body.id as userid
        POST /updateuserdata      (for new data for that day) req.body.data as emotion array req.body.id as userid
        PATCH /updateusercolor    TODO

*/

// GET userdata req.query.id
app.get("/userdata", async (req, res, err) => {
  MongoClient.connect(
    uri,
    { useNewUrlParser: true },
    async function(err, client) {
      assert.equal(null, err);
      const collection = client.db("users").collection("userdata");
      let result = await collection.findOne(ObjectId(req.query.id));
      res.send(result);
      client.close();
    }
  );
});

// GET emotion freq within timeperiod, req.query.id and (ex: 20180702 as req.query.datestart and 20180830 as req.query.dateend)
app.get("/userdatabydate", (req, res, err) => {
  let startYear = req.query.datestart.substr(0, 4);
  let startMonth = req.query.datestart.substr(4, 2);
  let startDay = req.query.datestart.substr(6, 2);
  let start = new Date(startYear, startMonth - 1, startDay);
  let endYear = req.query.dateend.substr(0, 4);
  let endMonth = req.query.dateend.substr(4, 2);
  let endDay = req.query.dateend.substr(6, 2);
  let end = new Date(endYear, endMonth - 1, endDay);

  MongoClient.connect(
    uri,
    { useNewUrlParser: true },
    async function(err, client) {
      assert.equal(null, err);
      const collection = client.db("users").collection("userdata");
      let result = await collection.findOne(ObjectId(req.query.id));
      result = result.emotionData;
      result = result.filter(date => {
        if (date.date >= start && date.date <= end) {
          return date;
        }
      });
      result = result.reduce((accumulatedArray, emotion) => {
        accumulatedArray = accumulatedArray.concat(emotion["emotions"]);
        return accumulatedArray;
      }, []);

      result = result.reduce((accumulatedObject, emotion) => {
        if (accumulatedObject[emotion]) {
          let value = accumulatedObject[emotion];
          value = value + 1;
          accumulatedObject[emotion] = value;
        } else {
          accumulatedObject[emotion] = 1;
        }
        return accumulatedObject;
      }, {});
      res.send(result);

      client.close();
    }
  );
});

// GET emotion freq within timeperiod, req.query.id and (ex: 20180702 as req.query.datestart and 20180830 as req.query.dateend)
app.get("/userdatabydatewithcolor", (req, res, err) => {
  let startYear = req.query.datestart.substr(0, 4);
  let startMonth = req.query.datestart.substr(4, 2);
  let startDay = req.query.datestart.substr(6, 2);
  let start = new Date(startYear, startMonth - 1, startDay);
  let endYear = req.query.dateend.substr(0, 4);
  let endMonth = req.query.dateend.substr(4, 2);
  let endDay = req.query.dateend.substr(6, 2);
  let end = new Date(endYear, endMonth - 1, endDay);

  MongoClient.connect(
    uri,
    { useNewUrlParser: true },
    async function(err, client) {
      assert.equal(null, err);
      const collection = client.db("users").collection("userdata");
      let result = await collection.findOne(ObjectId(req.query.id));
      let color = result.colors;
      result = result.emotionData;

      result = result.filter(date => {
        if (date.date >= start && date.date <= end) {
          return date;
        }
      });
      result = result.reduce((accumulatedArray, emotion) => {
        accumulatedArray = accumulatedArray.concat(emotion["emotions"]);
        return accumulatedArray;
      }, []);

      result = result.reduce((accumulatedObject, emotion) => {
        if (accumulatedObject[emotion]) {
          let value = accumulatedObject[emotion][0];
          value = value + 1;
          accumulatedObject[emotion] = [value];
        } else {
          accumulatedObject[emotion] = [1];
        }

        return accumulatedObject;
      }, {});
      let keys = Object.keys(result);

      for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < color.length; j++) {
          let hej = color[j][Object.keys(color[j])];
          if (hej.includes(keys[i])) {
            result[keys[i]].push(Object.keys(color[j])[0]);
          }
        }
      }

      res.send(result);

      client.close();
    }
  );
});

app.post("/newuser", async (req, res, err) => {
  let incoming = req.body.data;
  let date = await new Date();
  date.setHours(0, 0, 0, 0);
  let newUser = { emotionData: [{ date: date, emotions: incoming }], colors: { red: [], green: [], blue: [], orange: [], yellow: [], pink: [], turquoise: [], purple: [] } };

  MongoClient.connect(
    uri,
    { useNewUrlParser: true },
    async function(err, client) {
      assert.equal(null, err);
      const collection = client.db("users").collection("userdata");
      collection.insertOne(newUser, function(err, result) {
        res.send(result);
      });

      client.close();
    }
  );
});

//PATCH update userdata, req.body.id as identifier, req.body.data as new data

app.patch("/updateuserdata", async (req, res, err) => {
  let date = await new Date().setHours(0, 0, 0, 0);

  app.patch("/updateuserdata", async (req, res, err) => {
    let date = await new Date();
    date.setHours(0, 0, 0, 0);

    MongoClient.connect(
      uri,
      { useNewUrlParser: true },
      async function(err, client) {
        assert.equal(null, err);
        const collection = client.db("users").collection("userdata");
        collection.findOneAndUpdate({ $and: [{ _id: ObjectId(req.body.id) }, { "emotionData.date": date }] }, { $set: { "emotionData.$.emotions": req.body.data } }, { returnOriginal: false }, function(err, result) {
          if (result.lastErrorObject.updatedExisting) {
            res.send(result);
          } else {
            res.send("error");
          }
        });
        client.close();
      }
    );
  });

  app.post("/updateuserdata", async (req, res, err) => {
    let date = await new Date();
    date.setHours(0, 0, 0, 0);
    let objEmotionData = { date: date, emotions: req.body.data };

    MongoClient.connect(
      uri,
      { useNewUrlParser: true },
      async function(err, client) {
        assert.equal(null, err);
        const collection = client.db("users").collection("userdata");
        collection.findOneAndUpdate({ $and: [{ _id: ObjectId(req.body.id) }, { "emotionData.date": date }] }, { $set: { "emotionData.$.emotions": req.body.data } }, { returnOriginal: false }, function(err, result) {
          if (result.lastErrorObject.updatedExisting) {
            res.send(result);
          } else {
            res.send("error");
          }
        });
        client.close();
      }
    );
  });

  app.post("/updateuserdata", async (req, res, err) => {
    let incoming = req.body.data;
    let date = await new Date().setHours(0, 0, 0, 0);
    let objEmotionData = { date: date, emotions: incoming };

    MongoClient.connect(
      uri,
      { useNewUrlParser: true },
      async function(err, client) {
        assert.equal(null, err);
        const collection = client.db("users").collection("userdata");
        collection.findOneAndUpdate({ _id: ObjectId(req.body.id) }, { $push: { emotionData: objEmotionData } }, { returnOriginal: false }, function(err, result) {
          res.send(result);
        });
        client.close();
      }
    );
  });

  app.patch("/updateusercolor", async (req, res, err) => {
    console.log(req.body.data);
    let date = await new Date();

    date.setHours(0, 0, 0, 0);
    console.log(date);

    MongoClient.connect(
      uri,
      { useNewUrlParser: true },
      async function(err, client) {
        assert.equal(null, err);
        const collection = client.db("users").collection("userdata");
        collection.findOneAndUpdate({ _id: ObjectId(req.body.id) }, { colors: req.body.data }, { returnOriginal: false }, function(err, result) {
          console.log(result);
          if (result.lastErrorObject.updatedExisting) {
            res.send(result);
          }
        });
        client.close();
      }
    );
  });

  date.setHours(0, 0, 0, 0);
  console.log(date);

  MongoClient.connect(
    uri,
    { useNewUrlParser: true },
    async function(err, client) {
      assert.equal(null, err);
      const collection = client.db("users").collection("userdata");
      collection.findOneAndUpdate({ $and: [{ _id: ObjectId(req.body.id) }, { "emotionData.date": date }] }, { $set: { "emotionData.$.emotions": req.body.data } }, { returnOriginal: false }, function(err, result) {
        if (result.lastErrorObject.updatedExisting) {
          res.send(result);
        } else {
          res.send("error");
        }
      });

      client.close();
    }
  );
});

app.listen(PORT);
