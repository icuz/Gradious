const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());

const DATA_FILE = 'data.json';

// Function to read data from data.json
const readData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading data:', err);
    return {};
  }
};

// Function to write data to data.json
const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing data:', err);
  }
};

app.get('/test', (req, res) => {
  console.log(req.params);
  console.log(req.query);
  res.set({
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-methods": "*"
  });
  const data = { msg: "welcome" };
  res.send(JSON.stringify(data));
});

app.get('/test11', (req, res) => {
  res.send('welcome test');
});

app.post('/addSubscription', (req, res) => {
  console.log("params", req.params);
  console.log("query", req.query);
  console.log("body", req.body);
  res.set({
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-methods": "*"
  });

  const data = readData();
  data.subscriptions = data.subscriptions || [];
  data.subscriptions.push(req.body);
  writeData(data);

  res.send(JSON.stringify({ msg: "successfully subscribed" }));
});

app.get('/mySubscription', (req, res) => {
  console.log("Loading my subscription");

  res.set({
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-methods": "*"
  });

  const data = readData();
  res.send(JSON.stringify(data));
});

var testRouter = express.Router();
app.use("/mytest", testRouter);

testRouter.post('/test2/:cc', (req, res) => {
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);
  res.send('welcome');
});

app.listen(3001, () => {
  console.log(`Example app listening on port 3001`);
});

testRouter.post('/test3/:cc', (req, res) => {
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);
  res.send('welcome');
});

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  return next();
});