// Initialize the server with express.
const express = require('express');
const app = express();

// Redirect to crc website if anyone navigates to socket server url.
app.use('/', (req, res) => res.redirect('http://www.webzapper.space'));

// Run the express server which listens on the environment port.
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log('Server listening on port: ' + port + '\n');
});

// Run the socket service on the express server.
require('./src/index')(server);
