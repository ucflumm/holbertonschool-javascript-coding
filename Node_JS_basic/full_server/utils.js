const fs = require('fs');
const path = require('path');

function readDatabase(path) {
  return new Promise((resolve, reject) =>
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) reject(Error('Cannot load the database'));
      else resolve(data.toString().split('\n').filter((line) => line));
    })
  );
}

module.exports = readDatabase;