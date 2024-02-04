// Import the necessary modules
const http = require('http');
const fs = require('fs').promises;

// Define an asynchronous function to count students from a given file
async function countStudents(path) {
  try {
    // Read the file asynchronously and split its content into lines
    const data = await fs.readFile(path, 'utf8');
    const lines = data.split('\n').slice(1).filter((line) => line.trim()); // Ignore the header and empty lines
    let totalStudents = 0; // Initialize counter for total students
    const studentsByField = {}; // Initialize an object to hold counts
    // and names of students by field

    // Iterate over each line to process student data
    lines.forEach((line) => {
      const [firstname, , , field] = line.split(','); // Destructure each line to get needed data
      if (!studentsByField[field]) { // Check if field is already present in the object
        studentsByField[field] = { count: 0, names: [] }; // Initialize if not present
      }
      studentsByField[field].count += 1; // Increment count for the field
      studentsByField[field].names.push(firstname); // Add student's name to the field
      totalStudents += 1; // Increment total number of students
    });

    // Prepare the result string
    let result = `Number of students: ${totalStudents}\n`;
    // Append information about each field to the result string
    Object.entries(studentsByField).forEach(([field, students]) => {
      result += `Number of students in ${field}: ${students.count}. List: ${students.names.join(', ')}\n`;
    });
    return result; // Return the result string
  } catch (error) {
    throw new Error('Cannot load the database'); // Throw an error if file reading fails
  }
}

// Create an HTTP server
const app = http.createServer(async (req, res) => {
  // Handle requests to the root and /students paths
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' }); // Set response header
    res.end('Hello Holberton School!'); // Send a response for the root path
  } else if (req.url === '/students') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // Set response header for /students path
    try {
      const studentsInfo = await countStudents(process.argv[2]);
      // Await the countStudents function result
      res.write(`This is the list of our students\n${studentsInfo}`); // Write the student information to the response
      res.end(); // End the response
    } catch (error) {
      res.writeHead(500); // Set header for server error
      res.end('This is the list of our students\nCannot load the database'); // Send error response
    }
  }
});

// Start the server on port 1245
app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

// Export the app for testing or further use
module.exports = app;
