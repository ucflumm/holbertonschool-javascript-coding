const express = require('express');
const indexRouter = require('./routes/index');

const app = express();
app.use('/', indexRouter);

const port = 1245;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
