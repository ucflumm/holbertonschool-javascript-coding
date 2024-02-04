const fs = require('fs');
const path = require('path');
function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    let lines = data.split('\n');
    lines = lines.slice(0, lines.length);
    const fields = {};
    for (const line of lines) {
      const student = line.split(',');
      if (!fields[student[3]]) {
        fields[student[3]] = [];
      }
      fields[student[3]].push(student[0]);
    }


    console.log(`Number of students: ${lines.length - 1}`);
    let count = 0;
    for (const field in fields) {
      if (count === 0) {
        count++;
        continue;
      }
      else if (field) {
        count++;
        const list = fields[field];
        console.log(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}
module.exports = countStudents;