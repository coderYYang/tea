const express = require('express');

const app = express();
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const indexRouter = require('./router/router');
app.use('/api', indexRouter);

app.listen(3000, () => {
  console.log('Server running in http://127.0.0.1:3000')
})