#!/usr/bin/node
const request = require('request');
const url = process.argv[2];
const dict = {};
request(url, function (error, response, body) {
  if (error) {
    console.error(error);
  } else {
    const tasks = JSON.parse(body);
    for (const task of tasks) {
      if (task.completed === true) {
        if (dict[task.userId] === undefined) {
          dict[task.userId] = 1;
        } else {
          dict[task.userId]++;
        }
      }
    }
    console.log(dict);
  }
}
);
