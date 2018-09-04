const express = require('express');
const cors = require('cors');

const app = express();

const PORT = 4000;

app.use(express.static('kanslojagboken/public'));
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get('/', (req, res, err) => {
  res.sendFile('index.html');
});

app.listen(PORT);
