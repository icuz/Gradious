-- 1.Get only the product code and product name from the products table:
SELECT productCode, productName
FROM products;
-- ------------------------------------------------------
-- 2.Arrange the customer details based on the country name in descending order:
SELECT *
FROM customers
ORDER BY country DESC;
-- ------------------------------------------------------
-- 3.Find the order number, order date, and status for the customers having comments about shipment:
SELECT orderNumber, orderDate, status
FROM orders
WHERE comments IS NOT NULL AND comments <> '';
-- ------------------------------------------------------
-- 4.Find the customer who has made the highest payment along with the payment date:
SELECT customerNumber, paymentDate, amount
FROM payments
ORDER BY amount DESC
LIMIT 1;
-- ------------------------------------------------------
-- 5.Find the next top five customers who made the highest payment after the top five:
SELECT customerNumber, amount
FROM payments
ORDER BY amount DESC
LIMIT 5 OFFSET 5;
-- ------------------------------------------------------
-- 6.Find the customer details whose credit limit is between 10,000 to (incomplete limit assumed to be a high number like 100,000):
SELECT *
FROM customers
WHERE creditLimit BETWEEN 10000 AND 100000;
-- ------------------------------------------------------
-- 7.Get the employee number, last name, and first name from the employees' table whose last name starts with 'B':
SELECT employeeNumber, lastName, firstName
FROM employees
WHERE lastName LIKE 'B%';
-- ------------------------------------------------------
-- 8.Select the order whose total amount is greater than 50,000:
SELECT orderNumber, SUM(priceEach * quantityOrdered) AS totalAmount
FROM orderdetails
GROUP BY orderNumber
HAVING totalAmount > 50000;
-- ------------------------------------------------------
-- 9.Find the product code, product name, and text description from the tables products and product lines:
SELECT p.productCode, p.productName, pl.textDescription
FROM products p
JOIN productlines pl ON p.productLine = pl.productLine;
-- ------------------------------------------------------
-- 10.Get the customer number, customer name, order number, and status from the tables orders, payments, and customers who have no order:
SELECT c.customerNumber, c.customerName, o.orderNumber, o.status
FROM customers c
LEFT JOIN orders o ON c.customerNumber = o.customerNumber
WHERE o.orderNumber IS NULL;
-- ------------------------------------------------------