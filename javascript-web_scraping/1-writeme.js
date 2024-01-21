#!/usr/bin/node
const fs = require('fs');
// argv[2] is the dest file name
const file = process.argv[2];
// argv[3] is the content to write
const content = process.argv[3];

fs.writeFile(file, content, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
});
