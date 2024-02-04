const readDatabase = require('../utils');

class StudentsController {
  static getAllStudents(request, response) {
    readDatabase(process.argv[2])
      .then((data) => {
        const fields = {};
        data.forEach((student) => {
          if (!fields[student.field]) fields[student.field] = [];
          fields[student.field].push(student.firstname);
        });
        response.status(200).send('This is the list of our students\n');
        Object.keys(fields).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).forEach((field) => {
          response.write(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`);
        });
        response.end();
      })
      .catch(() => response.status(500).send('Cannot load the database'));
  }

  static getAllStudentsByMajor(request, response) {
    if (request.params.major !== 'CS' && request.params.major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
    } else {
      readDatabase(process.argv[2])
        .then((data) => {
          const students = data.filter((student) => student.field === request.params.major);
          response.status(200).send(`List: ${students.map((student) => student.firstname).join(', ')}`);
        })
        .catch(() => response.status(500).send('Cannot load the database'));
    }
  }
}

module.exports = StudentsController;
