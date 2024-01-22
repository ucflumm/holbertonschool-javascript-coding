#!/usr/bin/node
const request = require('request');
const url = process.argv[2];
let count = 0;
request(url, function (error, response, body) {
  if (error) {
    console.error(error);
  } else {
    const films = JSON.parse(body).results;
    for (const film of films) {
      for (const character of film.characters) {
        if (character.endsWith('/18/')) {
          count++;
        }
      }
    }
    console.log(count);
  }
}
);
