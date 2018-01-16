const http = require('http');

const storage = require('./server/storage');

const app = require('./server/http-server');
const server = http.createServer(app);
const wss = require('./server/ws-server')(server);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);
app.set('wss', wss);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
