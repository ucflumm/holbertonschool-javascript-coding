// Import the modules
const fs = require('fs');
// eslint-disable-next-line no-unused-vars
const path = require('path');

// Define the countStudents function that accepts a path to the database file
function countStudents(filePath) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    let lines = data.split('\n');
    lines.shift();
    const fields = {};
    for (const line of lines) {
      const student = line.split(',');
      if (!fields[student[3]]) {
        fields[student[3]] = [];
      }
      // Add the student's first name to the field
      fieldCounts[parsedStudent[3]].push(parsedStudent[0]);
    });

    console.log(`Number of students: ${lines.length}`);
    Object.keys(fields).forEach((field) => {
      if (field) {
        const list = fields[field];
        console.log(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
      }
    }
    );
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

// Export the countStudents function to be used in other files
module.exports = countStudents;
