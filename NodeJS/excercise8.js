const xlsx = require('xlsx');
const fs = require('fs'); // Not used in this version, but kept for clarity

const jsonData = [
    { name: 'Ravi Kumar', age: 30, city: 'Delhi' },
    { name: 'Priya Sharma', age: 25, city: 'Mumbai' },
    { name: 'Amit Patel', age: 27, city: 'Ahmedabad' },
    { name: 'Sneha Gupta', age: 35, city: 'Kolkata' },
];

console.log('Writing data to Excel file...');

const worksheet = xlsx.utils.json_to_sheet(jsonData);
const workbook = xlsx.utils.book_new(); 
xlsx.utils.book_append_sheet(workbook, worksheet, 'data'); 
xlsx.writeFile(workbook, './lib/data.xlsx');

console.log('Excel file written successfully to output/data.xlsx');
