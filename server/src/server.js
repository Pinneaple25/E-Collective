const http = require('http');
require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const startServer = async() => {
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();