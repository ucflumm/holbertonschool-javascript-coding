const fs = require('fs');
const path = require('path');

function countStudents(path) {
  return new Promise((resolve, reject) => fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }
    const lines = data.split('\n').slice(0, -1);
    const fields = {};
    for (const line of lines) {
      const student = line.split(',');
      if (!fields[student[3]]) {
        fields[student[3]] = [];
      }
      fields[student[3]].push(student[0]);
    }
    console.log(`Number of students: ${lines.length}`);
    for (const field in fields) {
      if (field) {
        const list = fields[field];
        console.log(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
      }
    }
    resolve();
  }
  ));
}
module.exports = countStudents;