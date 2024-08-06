const fs = require('fs');
const path = require('path');

// Helper function to read JSON file
const readJSONFile = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Helper function to get week number from date
const getWeekNumber = (date) => {
    const [day, month, year] = date.split('-').map(Number);
    const d = new Date(year, month - 1, day); 
    if (isNaN(d.getTime())) {
        console.error(`Invalid date: ${date}`);
        return null;
    }
    const oneJan = new Date(d.getFullYear(), 0, 1);
    const weekNumber =  Math.ceil((((d - oneJan) / 86400000) + oneJan.getDay() + 1) / 7);
     return weekNumber.toString().padStart(2, '0');
};

// Read and parse JSON files
const addressData = readJSONFile(path.join(__dirname, 'data/address.json'));
const orderData = readJSONFile(path.join(__dirname, 'data/order.json'));

// 1. The date when we did the highest business
const highestBusinessDate = orderData.reduce((max, order) => {
  return order.OrderAmount > max.OrderAmount ? order : max;
}, orderData[0]).OrderDate;

// 2. Percentage change in retail business between each week
const retailOrders = orderData.filter(order => order.TypeOfOrder === 'Retail');
const retailWeeklySales = retailOrders.reduce((acc, order) => {
  const week = getWeekNumber(order.OrderDate);
  if (week !== null) {
    acc[week] = (acc[week] || 0) + parseFloat(order.OrderAmount);
  }
  return acc;
}, {});

const retailWeeklyChange = Object.keys(retailWeeklySales).sort().map((week, index, weeks) => {
  if (index === 0) return null;
  const prevWeek = weeks[index - 1];
  const change = ((retailWeeklySales[week] - retailWeeklySales[prevWeek]) / retailWeeklySales[prevWeek]) * 100;
  const formattedChange = `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
  return { [`week${prevWeek}_to_week${week}`]: formattedChange };
}).filter(change => change !== null);

// 3. List the unique customer and address along with the total order value
const customerOrders = orderData.reduce((acc, order) => {
  const customer = addressData.find(addr => addr.CustomerID === order['Customer ID']);
  if (customer) {
    if (!acc[customer.FirstName]) {
      acc[customer.FirstName] = { 
        name: customer.FirstName +" "+ customer.LastName || 'Unknown', 
        address: customer.Address || 'Unknown', 
        totalOrderValue: 0 
      };
    }
    acc[customer.FirstName].totalOrderValue += parseFloat(order.OrderAmount);
  }
  return acc;
}, {});

// 4. Percentage change in business between each week
const weeklySales = orderData.reduce((acc, order) => {
  const week = getWeekNumber(order.OrderDate);
  if (week !== null) {
    acc[week] = (acc[week] || 0) + parseFloat(order.OrderAmount);
  }
  return acc;
}, {});

const weeklyChange = Object.keys(weeklySales).sort().map((week, index, weeks) => {
  if (index === 0) return null;
  const prevWeek = weeks[index - 1];
  const change = ((weeklySales[week] - weeklySales[prevWeek]) / weeklySales[prevWeek]) * 100;
  const formattedChange = `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
  return { [`week${prevWeek}_to_week${week}`]: formattedChange };
}).filter(change => change !== null);

// 5. Week-wise Sales based on Customer type
const weekWiseSales = orderData.reduce((acc, order) => {
  const week = "week" + getWeekNumber(order.OrderDate);
  if (week !== null) {
    if (!acc[week]) acc[week] = {};
    if (!acc[week][order.TypeOfOrder]) acc[week][order.TypeOfOrder] = 0;
    acc[week][order.TypeOfOrder] += parseFloat(order.OrderAmount);
  }
  return acc;
}, {});

// Sort weekWiseSales by week number
const sortedWeekWiseSales = Object.keys(weekWiseSales).sort().reduce((acc, key) => {
  acc[key] = weekWiseSales[key];
  return acc;
}, {});

// console.log(sortedWeekWiseSales);

module.exports = {
  highestBusinessDate,
  retailWeeklyChange,
  customerOrders: Object.values(customerOrders).sort((a, b) => a.name.localeCompare(b.name)),
  weeklyChange,
  weekWiseSales: sortedWeekWiseSales    
};