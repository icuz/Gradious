-- 1. Calculate the total number of products in the database:
SELECT COUNT(*) AS totalProducts
FROM products;
-- ------------------------------------------------------

-- 2. Find the average buy price of all products:
SELECT AVG(buyPrice) AS averageBuyPrice
FROM products;
-- ------------------------------------------------------

-- 3. Determine the maximum quantity in stock across all products:
SELECT MAX(quantityInStock) AS maxQuantityInStock
FROM products;
-- ------------------------------------------------------

-- 4. Calculate the total sales revenue for each product line:
SELECT pl.productLine, SUM(od.quantityOrdered * od.priceEach) AS totalSalesRevenue
FROM orderdetails od
JOIN products p ON od.productCode = p.productCode
JOIN productlines pl ON p.productLine = pl.productLine
GROUP BY pl.productLine;
-- ------------------------------------------------------

-- 5. Determine the average credit limit for all customers:
SELECT AVG(creditLimit) AS averageCreditLimit
FROM customers;
-- ------------------------------------------------------

-- 6. Find the highest payment amount made by a customer:
SELECT MAX(amount) AS highestPayment
FROM payments;
-- ------------------------------------------------------

-- 7. Calculate the total quantity ordered for each product:
SELECT productCode, SUM(quantityOrdered) AS totalQuantityOrdered
FROM orderdetails
GROUP BY productCode;
-- ------------------------------------------------------

-- 8. Determine the number of employees in each office:
SELECT officeCode, COUNT(*) AS numberOfEmployees
FROM employees
GROUP BY officeCode;
-- ------------------------------------------------------

-- 9. Calculate the average price for each order:
SELECT orderNumber, AVG(priceEach) AS averagePrice
FROM orderdetails
GROUP BY orderNumber;
-- ------------------------------------------------------

-- 10. Determine the total sales revenue for each country:
SELECT c.country, SUM(od.quantityOrdered * od.priceEach) AS totalSalesRevenue
FROM orders o
JOIN customers c ON o.customerNumber = c.customerNumber
JOIN orderdetails od ON o.orderNumber = od.orderNumber
GROUP BY c.country;
-- ------------------------------------------------------

-- 11. Calculate the average quantity in stock for each product line:
SELECT pl.productLine, AVG(p.quantityInStock) AS averageQuantityInStock
FROM products p
JOIN productlines pl ON p.productLine = pl.productLine
GROUP BY pl.productLine;
-- ------------------------------------------------------

-- 12. Determine the total number of orders placed by each customer:
SELECT customerNumber, COUNT(*) AS totalOrders
FROM orders
GROUP BY customerNumber;
-- ------------------------------------------------------

-- 13. Find the maximum credit limit among all customers:
SELECT MAX(creditLimit) AS maxCreditLimit
FROM customers;
-- ------------------------------------------------------

-- 14. Count the number of offices in each country:
SELECT country, COUNT(*) AS numberOfOffices
FROM offices
GROUP BY country;
-- ------------------------------------------------------

-- 15. Calculate the average payment amount for each customer:
SELECT customerNumber, AVG(amount) AS averagePaymentAmount
FROM payments
GROUP BY customerNumber;
-- ------------------------------------------------------

-- 16. Determine the number of products in each product line:
SELECT productLine, COUNT(*) AS numberOfProducts
FROM products
GROUP BY productLine;
-- ------------------------------------------------------

-- 17. Count the number of customers in each state:
SELECT state, COUNT(*) AS numberOfCustomers
FROM customers
GROUP BY state;
-- ------------------------------------------------------

-- 18. Find the minimum payment amount among all customers:
SELECT MIN(amount) AS minimumPayment
FROM payments;
-- ------------------------------------------------------

-- 19. Calculate the average sales revenue per order:
SELECT orderNumber, AVG(quantityOrdered * priceEach) AS averageSalesRevenue
FROM orderdetails
GROUP BY orderNumber;
-- ------------------------------------------------------

-- 20. Determine the total quantity ordered for each product line:
SELECT pl.productLine, SUM(od.quantityOrdered) AS totalQuantityOrdered
FROM orderdetails od
JOIN products p ON od.productCode = p.productCode
JOIN productlines pl ON p.productLine = pl.productLine
GROUP BY pl.productLine;
-- ------------------------------------------------------
