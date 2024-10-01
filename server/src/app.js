const path = require('path');
const express = require('express');
const api = require('./api');

const app = express();

app.use(express.json())

app.use('/v1', api);

app.get('/', (_, res) => 
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'public', 'index.html'))
);

module.exports = app;