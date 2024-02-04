const express = require('express');

const app = express();

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const port = 1245;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;