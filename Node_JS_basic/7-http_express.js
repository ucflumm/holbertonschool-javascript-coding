// Import the necessary modules
const express = require('express');
const fs = require('fs').promises;

// Initialize an Express application
const app = express();

// Define a route handler for the root route ('/')
app.get('/', (req, res) => {
  res.type('text/plain'); // Set the Content-Type of the response to text/plain
  res.send('Hello Holberton School!'); // Send a plain text response to the client
});

// Define a route handler for the '/students' route
app.get('/students', async (req, res) => {
  const databasePath = process.argv[2]; // Get the database file path from command line arguments
  try {
    // Read the database file asynchronously
    const data = await fs.readFile(databasePath, 'utf8');
    // Process the file data
    const lines = data.split('\n').slice(1).filter((line) => line.trim() !== ''); // Remove the header and empty lines
    let totalStudents = 0;
    const studentsByField = {};

    // Count students and group them by field
    lines.forEach((line) => {
      const [firstname, , , field] = line.split(',');
      if (!studentsByField[field]) { // Initialize the field if it's not already present
        studentsByField[field] = { count: 0, names: [] };
      }
      studentsByField[field].count += 1; // Increment the count for the field
      studentsByField[field].names.push(firstname); // Add the student's name to the field
      totalStudents += 1; // Increment the total number of students
    });

    // Construct the response text
    let responseText = `This is the list of our students\nNumber of students: ${totalStudents}\n`;
    Object.entries(studentsByField).forEach(([field, students]) => {
      responseText += `Number of students in ${field}: ${students.count}. List: ${students.names.join(', ')}\n`;
    });

    // Send the constructed response to the client
    res.type('text/plain');
    res.send(responseText);
  } catch (error) { // Handle errors (e.g., file not found)
    res.type('text/plain');
    res.status(500).send('This is the list of our students\nCannot load the database');
  }
});

// Start the Express server on port 1245
app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

// Export the Express app for potential further use, such as testing
module.exports = app;
