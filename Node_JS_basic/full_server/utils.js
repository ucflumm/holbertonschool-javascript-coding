// import module needed
const fs = require('fs');

// define function to readDb
function readDatabase(filepath) {
  // return new promise tha thandles async func
  return new Promise((resolve, reject) => {
  // asynchornously read the file given with utf8 encoding
    fs.readFile(filepath, 'utf-8', (err, data) => {
      // if err occurs, handle error, reject promise
      if (err) {
        reject(Error('Cannot load the database'));
      } else {
        try {
        // split the file content by newline char to get array
          const lines = data.split('\n');
          // skip the header line and keep the rest
          const students = lines.slice(1);
          // initialise empty obj to hold the parsed data
          const result = {};

          // Iterate over eachs tudent entry
          students.forEach((line) => {
            // destructure each line into its parts (csv format)
            const [firstname, , , field] = line.split(',');
            // Skip entry it it's missing a field or firstname
            if (!field || !firstname) return;

            // Initialise the field array in result if it doesn't exist
            if (!result[field]) {
              result[field] = [];
            }
            // Add the student's firstname to the array for their field
            result[field].push(firstname);
          });
          console.log(result);
          // Resolve the promise with the aggregarted/summarised data
          resolve(result);
        } catch (error) {
        // If parsing fails, reject the promise
          reject(Error('Failed to parse database file'));
        }
      }
    });
  });
}
// Export the readDatabase function to make it available for import in other files
module.exports = readDatabase;
