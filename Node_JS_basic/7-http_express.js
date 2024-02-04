const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  const databasePath = path.join(__dirname, process.argv[2] || 'database.csv');
  try {
    const data = await fs.promises.readFile(databasePath, 'utf8');
    let lines = data.split('\n');
    lines.shift();
    const fields = {};
    for (const line of lines) {
      const student = line.split(',');
      if (!fields[student[3]]) {
        fields[student[3]] = [];
      }
      fields[student[3]].push(student[0]);
    }
    let count = `Number of students: ${lines.length}`;
    Object.keys(fields).forEach((field) => {
      if (field) {
        const list = fields[field];
        count += `\nNumber of students in ${field}: ${list.length}. List: ${list.join(', ')}`;
      }
    });
    res.send(count);
  } catch (error) {
    res.send('Cannot load the database');
  }
});

app.listen(1245, () => {
  console.log('Listening on port 1245');
});
