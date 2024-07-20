const fs = require('fs');

const userData = [
    {
      "Name": "Rahul Sharma",
      "Age": "18",
      "Gender": "Male",
      "City": "hyderabad"
    },
    {
      "Name": "Priya Patel",
      "Age": "17",
      "Gender": "Female",
      "City": "delhi"
    },
    {
      "Name": "Rajesh Kumar",
      "Age": "19",
      "Gender": "Male",
      "City": "pune"
    },
    {
      "Name": "Anjali Singh",
      "Age": "16",
      "Gender": "Female",
      "City": "mysore"
    },
    {
      "Name": "Vikram Verma",
      "Age": "18",
      "Gender": "Male",
      "City": "banglore"
    }
];

const formattedData = userData
  .map((user) => `${user.Name} | ${user.Age} | ${user.Gender} | ${user.City}`)
  .join("\n");

fs.writeFile("./lib/user_info.txt", formattedData, (err) => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }
  console.log("User data written successfully to output/user_info.txt");
});
