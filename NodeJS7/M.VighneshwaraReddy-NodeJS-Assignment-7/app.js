const express = require('express');
const {
  highestBusinessDate,
  retailWeeklyChange,
  customerOrders,
  weeklyChange,
  weekWiseSales
} = require('./data');

const app = express();
const port = 3000;

// Endpoints
app.get('/sales/highest-business-date', (req, res) => {
  res.json({ highestBusinessDate });
});

app.get('/sales/percentage-change-retail', (req, res) => {
  res.json(retailWeeklyChange);
});

app.get('/customers', (req, res) => {
  res.json(customerOrders);
});

app.get('/sales/percentage-change', (req, res) => {
  res.json(weeklyChange);
});

app.get('/sales/weekwise', (req, res) => {
  res.json(weekWiseSales);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});