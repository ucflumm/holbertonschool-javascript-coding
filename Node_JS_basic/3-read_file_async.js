const fs = require('fs');

// Export the countStudents function that returns a promise
module.exports = function countStudents(path) {
  return new Promise((resolve, reject) => {
    // Asynchronously read the file at the given path
    fs.readFile(path, 'utf8', (error, data) => {
      // Reject the promise with an error if reading the file fails
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }
      // Split the file content into lines, ignore the header, and filter out empty lines
      const lines = data.split('\n').slice(1).filter((line) => line.trim() !== '');

      let totalStudents = 0; // Initialize the total number of students
      const studentsByField = {}; // Initialize an object to store students by their field of study

      // Process each line to count students and group them by field
      lines.forEach((line) => {
        const [firstname, , , field] = line.split(',');
        // If the field doesn't exist in the object, initialize it
        if (!studentsByField[field]) {
          studentsByField[field] = { count: 0, names: [] };
        }
        // Increment the count for the field and add the student's name
        studentsByField[field].count += 1;
        studentsByField[field].names.push(firstname);
        totalStudents += 1; // Increment the total number of students
      });

      // Log the total number of students
      console.log(`Number of students: ${totalStudents}`);
      // Log the number of students and their names for each field
      Object.entries(studentsByField).forEach(([field, students]) => {
        console.log(`Number of students in ${field}: ${students.count}. List: ${students.names.join(', ')}`);
      });

      // Resolve the promise when processing is complete
      resolve();
    });
  });
};
