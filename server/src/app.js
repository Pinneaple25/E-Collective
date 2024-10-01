const path = require('path');
const express = require('express');

const app = express();

app.get('/', (_, res) => 
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'public', 'index.html'))
);

module.exports = app;