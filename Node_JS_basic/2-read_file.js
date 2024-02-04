// Import the modules
const fs = require('fs');
// eslint-disable-next-line no-unused-vars
const path = require('path');

// Define the countStudents function that accepts a path to the database file
function countStudents(filePath) {
  try {
    // Read the file synchronously
    const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
    // Split the data into an array of lines
    let students = data.split('\n').filter((line) => line.trim());

    // Remove the header row
    students.shift();

    // Check for empty lines and filter them out
    students = students.filter((student) => student.length > 0);

    // Log the total number of students
    console.log(`Number of students: ${students.length}`);

    // Create an object to store the count of students by field
    const fieldCounts = {};

    // Process each student
    students.forEach((student) => {
      const parsedStudent = student.split(',');
      // Check if field already exists, if not initialize with empty array
      if (!fieldCounts[parsedStudent[3]]) {
        fieldCounts[parsedStudent[3]] = [];
      }
      // Add the student's first name to the field
      fieldCounts[parsedStudent[3]].push(parsedStudent[0]);
    });

    // Log the number of students in each field and their names
    Object.keys(fieldCounts).forEach((field) => {
      console.log(`Number of students in ${field}: ${fieldCounts[field].length}. List: ${fieldCounts[field].join(', ')}`);
    });
  } catch (err) {
    // Throw an error if the file cannot be read
    throw new Error('Cannot load the database');
  }
}

// Export the countStudents function to be used in other files
module.exports = countStudents;
