//npm install xlsx
const xlsx = require('xlsx');

function processExcelData(filePath) { 
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; 
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);
  console.log('Excel data converted to JSON:', JSON.stringify(jsonData, null, 2)); 
}

console.log('Reading data from Excel file...');
processExcelData('./lib/marks.xlsx'); 
