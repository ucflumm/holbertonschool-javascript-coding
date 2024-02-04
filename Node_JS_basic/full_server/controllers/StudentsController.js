// Import the readDatabase utility function
const readDatabase = require('../utils');

// Define a class to handle student-related routes
class StudentsController {
  // Define an asynchronous method to get all students
  static async getAllStudents(req, res) {
    try {
      // Await the promise returned by readDatabase for the database path provided via command line
      const database = await readDatabase(process.argv[2]);
      // Respond with a 200 status code and a formatted string of students in CS and SWE
      res.status(200)
        .send(`This is the list of our students\nNumber of students in CS: ${database.CS.length}.\
 List: ${database.CS.join(', ')}\nNumber of students in SWE: ${database.SWE.length}.\
 List: ${database.SWE.join(', ')}`);
      res.end();
    } catch (error) {
      // If reading the database fails, respond with a 500 status code
      res.status(500).send('Cannot load the database');
    }
  }

  // Define an asynchronous method to get all students by a specific major
  static async getAllStudentsByMajor(req, res) {
    try {
      // Get the major from request parameters and convert it to uppercase
      const major = req.params.major.toUpperCase();
      // Check if the major is valid (CS or SWE),
      // if not, send a 500 status code with an error message
      if (!['CS', 'SWE'].includes(major)) {
        return res.status(500).send('Major parameter must be CS or SWE');
      }
      // Await the promise returned by readDatabase for the database path provided via command line
      const database = await readDatabase(process.argv[2]);
      // Check if the major exists in the database,
      // if not, send a 500 status code with an error message
      if (!database[major]) {
        return res.status(500).send(`Major ${major} does not exist`);
      }
      // If the major exists, respond with a 200 status code and a list of students in the major
      return res.status(200).send(`List: ${database[major].join(', ')}`);
    } catch (error) {
      // If reading the database or any other operation fails, respond with a 500 status code
      return res.status(500).send('Cannot load the database');
    }
  }
}

// Export the StudentsController class for use in other parts of the application
module.exports = StudentsController;
