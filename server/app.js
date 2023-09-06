require('@babel/register');
require('dotenv').config();
const express = require('express');
const upload = require('express-fileupload')

const app = express();

app.use(upload())

const PORT = process.env.PORT || 4000;

const indexRouter = require('./routes/index');

const serverConfig = require('./config/serverConfig');

serverConfig(app);

app.use('/', indexRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Трунь трунь трунь на ${PORT} порту`);
});
