var employees = [{
	"name": "Aghil",
	"age": 20,
	"salary": 50000,
	"department": "development",
	"city": "Hyderabad"
},{
	"name": "Babu",
	"age": 25,
	"salary": 60000,
	"department": "marketing",
	"city": "Delhi"
},{
	"name": "Babu",
	"age": 25,
	"salary": 60000,
	"department": "marketing",
	"city": "Pune"
},{
    "name": "Chaitanya",
    "age": 30,
    "salary": 70000,
    "department": "sales",
    "city": "Mumbai"
}, {
    "name": "Divya",
    "age": 28,
    "salary": 55000,
    "department": "development",
    "city": "Bangalore"
}, {
    "name": "Eesha",
    "age": 22,
    "salary": 48000,
    "department": "hr",
    "city": "Chennai"
}, {
    "name": "Farhan",
    "age": 27,
    "salary": 62000,
    "department": "marketing",
    "city": "Hyderabad"
}, {
    "name": "Gaurav",
    "age": 32,
    "salary": 72000,
    "department": "sales",
    "city": "Delhi"
}, {
    "name": "Harini",
    "age": 29,
    "salary": 53000,
    "department": "development",
    "city": "Pune"
}, {
    "name": "Ishita",
    "age": 24,
    "salary": 49000,
    "department": "hr",
    "city": "Mumbai"
}, {
    "name": "Jatin",
    "age": 31,
    "salary": 71000,
    "department": "sales",
    "city": "Bangalore"
}, {
    "name": "Kritika",
    "age": 26,
    "salary": 59000,
    "department": "development",
    "city": "Chennai"
}, {
    "name": "Lalita",
    "age": 23,
    "salary": 54000,
    "department": "marketing",
    "city": "Hyderabad"
}, {
    "name": "Manan",
    "age": 33,
    "salary": 73000,
    "department": "sales",
    "city": "Delhi"
}, {
    "name": "Neha",
    "age": 21,
    "salary": 47000,
    "department": "hr",
    "city": "Pune"
}, {
    "name": "Omkar",
    "age": 30,
    "salary": 70000,
    "department": "marketing",
    "city": "Mumbai"
}, {
    "name": "Priyanka",
    "age": 28,
    "salary": 56000,
    "department": "development",
    "city": "Bangalore"
}, {
    "name": "Rajesh",
    "age": 22,
    "salary": 50000,
    "department": "hr",
    "city": "Chennai"
}];

function getEmployees() {
  return employees.map(employee => ({
    ...employee, 
    tier: employee.salary > 50000 ? 1 : 2 
  }));
}

function getEmployeesFromCity(city) {
  return employees.filter(employee => employee.city === city);
}

function getTotalSalary() {
  return employees.reduce((total, employee) => total + employee.salary, 0);
}

function getTotalSalaryOfHyderabad() {
  return employees
    .filter(employee => employee.city === 'Hyderabad')
    .reduce((total, employee) => total + employee.salary, 0);
}

function getTotalSalaryOfTier1() {
  const employeesWithTier = getEmployees();
  return employeesWithTier
    .filter(employee => employee.tier === 1)
    .reduce((total, employee) => total + employee.salary, 0);
}



// Example usage
console.log("Employees from Hyderabad:");
console.log(getEmployeesFromCity('Hyderabad'));
console.log("_________________________________________________________________________________");
console.log("All employees:");
console.log(getEmployees());
console.log("_________________________________________________________________________________");
console.log("Total Salary of all employees:");
console.log(getTotalSalary());
console.log("_________________________________________________________________________________");
console.log("Total Salary of employees from Hyderabad:");
console.log(getTotalSalaryOfHyderabad());
console.log("_________________________________________________________________________________");
console.log("Total Salary of Tier 1 employees:");
console.log(getTotalSalaryOfTier1());