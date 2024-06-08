-- 1. Retrieve the product details for order 10103:
SELECT p.*
FROM orderdetails od
JOIN products p ON od.productCode = p.productCode
WHERE od.orderNumber = 10103;
-- ------------------------------------------------------

-- 2. Get the customer information for order 10127:
SELECT c.*
FROM orders o
JOIN customers c ON o.customerNumber = c.customerNumber
WHERE o.orderNumber = 10127;
-- ------------------------------------------------------

-- 3. Retrieve the employee information for customer 166:
SELECT e.*
FROM customers c
JOIN employees e ON c.salesRepEmployeeNumber = e.employeeNumber
WHERE c.customerNumber = 166;
-- ------------------------------------------------------

-- 4. Get the official information for office code 4:
SELECT *
FROM offices
WHERE officeCode = 4;
-- ------------------------------------------------------

-- 5. Retrieve the product line for each product in an order:
SELECT od.orderNumber, p.productCode, p.productName, pl.productLine
FROM orderdetails od
JOIN products p ON od.productCode = p.productCode
JOIN productlines pl ON p.productLine = pl.productLine;
-- ------------------------------------------------------

-- 6. Get the customer information and order status for all orders that contain products belonging to the 'Classic Cars' product line:
SELECT DISTINCT c.customerNumber, c.customerName, o.orderNumber, o.status
FROM customers c
JOIN orders o ON c.customerNumber = o.customerNumber
JOIN orderdetails od ON o.orderNumber = od.orderNumber
JOIN products p ON od.productCode = p.productCode
JOIN productlines pl ON p.productLine = pl.productLine
WHERE pl.productLine = 'Classic Cars';
-- ------------------------------------------------------

-- 7. Retrieve the payment details and customer details of customer number 103:
SELECT p.*, c.*
FROM payments p
JOIN customers c ON p.customerNumber = c.customerNumber
WHERE p.customerNumber = 103;
-- ------------------------------------------------------

-- 8. Get the orders and their corresponding payments to the same customer:
SELECT o.orderNumber, o.customerNumber, p.paymentDate, p.amount
FROM orders o
JOIN payments p ON o.customerNumber = p.customerNumber;
-- ------------------------------------------------------

-- 9. Retrieve the customers and their associated orders:
SELECT c.customerNumber, c.customerName, o.orderNumber, o.orderDate
FROM customers c
JOIN orders o ON c.customerNumber = o.customerNumber;
-- ------------------------------------------------------

-- 10. Get the products and their corresponding product lines:
SELECT p.productCode, p.productName, pl.productLine
FROM products p
JOIN productlines pl ON p.productLine = pl.productLine;
-- ------------------------------------------------------

-- 11. Retrieve the employees and their respective managers:
SELECT e1.employeeNumber, e1.lastName, e1.firstName, e2.employeeNumber AS managerNumber, e2.lastName AS managerLastName, e2.firstName AS managerFirstName
FROM employees e1
LEFT JOIN employees e2 ON e1.reportsTo = e2.employeeNumber;
-- ------------------------------------------------------

-- 12. Retrieve the customers, their orders, and the corresponding product details:
SELECT c.customerNumber, c.customerName, o.orderNumber, od.productCode, od.quantityOrdered, p.productName
FROM customers c
JOIN orders o ON c.customerNumber = o.customerNumber
JOIN orderdetails od ON o.orderNumber = od.orderNumber
JOIN products p ON od.productCode = p.productCode;
-- ------------------------------------------------------

-- 13. Get the payment details, order details, and the associated products:
SELECT p.paymentDate, o.orderNumber, od.productCode, od.quantityOrdered, pr.productName
FROM payments p
JOIN orders o ON p.customerNumber = o.customerNumber
JOIN orderdetails od ON o.orderNumber = od.orderNumber
JOIN products pr ON od.productCode = pr.productCode;
-- ------------------------------------------------------

-- 14. Retrieve the payment details and the customer information for the check number - JM555205:
SELECT p.*, c.*
FROM payments p
JOIN customers c ON p.customerNumber = c.customerNumber
WHERE p.checkNumber = 'JM555205';
-- ------------------------------------------------------

-- 15. Retrieve the orders and their corresponding customer and employee information for a canceled status:
SELECT o.orderNumber, o.status, c.customerNumber, c.customerName, e.employeeNumber, e.lastName, e.firstName
FROM orders o
JOIN customers c ON o.customerNumber = c.customerNumber
LEFT JOIN employees e ON c.salesRepEmployeeNumber = e.employeeNumber
WHERE o.status = 'Cancelled';

-- ------------------------------------------------------

-- 16. Get the payments, order details, and associated product information for the payment date - 2004-12-17:
SELECT p.paymentDate, o.orderNumber, od.productCode, od.quantityOrdered, pr.productName
FROM payments p
JOIN orders o ON p.customerNumber = o.customerNumber
JOIN orderdetails od ON o.orderNumber = od.orderNumber
JOIN products pr ON od.productCode = pr.productCode
WHERE p.paymentDate = '2004-12-17';
-- ------------------------------------------------------

-- 17. Retrieve the products, order details, and corresponding customer information for customer 112:
SELECT c.customerNumber, c.customerName, o.orderNumber, od.productCode, od.quantityOrdered, p.productName
FROM customers c
JOIN orders o ON c.customerNumber = o.customerNumber
JOIN orderdetails od ON o.orderNumber = od.orderNumber
JOIN products p ON od.productCode = p.productCode
WHERE c.customerNumber = 112;
-- ------------------------------------------------------

-- 18. Retrieve the customers, their orders, and the associated product line information for the customers who are all from Boston:
SELECT c.customerNumber, c.customerName, o.orderNumber, pl.productLine
FROM customers c
JOIN orders o ON c.customerNumber = o.customerNumber
JOIN orderdetails od ON o.orderNumber = od.orderNumber
JOIN products p ON od.productCode = p.productCode
JOIN productlines pl ON p.productLine = pl.productLine
WHERE c.city = 'Boston';
-- ------------------------------------------------------

-- 19. Get the employees, their respective managers, and the corresponding office details of the Sales Rep:
SELECT e.employeeNumber, e.lastName, e.firstName, m.employeeNumber AS managerNumber, m.lastName AS managerLastName, m.firstName AS managerFirstName, o.officeCode, o.city, o.country
FROM employees e
LEFT JOIN employees m ON e.reportsTo = m.employeeNumber
JOIN offices o ON e.officeCode = o.officeCode
WHERE e.jobTitle = 'Sales Rep';
-- ------------------------------------------------------

-- 20. Retrieve the product lines, products, and the corresponding customer information for Vintage Cars:
SELECT pl.productLine, p.productCode, p.productName, c.customerNumber, c.customerName
FROM productlines pl
JOIN products p ON pl.productLine = p.productLine
JOIN orderdetails od ON p.productCode = od.productCode
JOIN orders o ON od.orderNumber = o.orderNumber
JOIN customers c ON o.customerNumber = c.customerNumber
WHERE pl.productLine = 'Vintage Cars';
-- ------------------------------------------------------
