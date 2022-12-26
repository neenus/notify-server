import http from 'http';
import app from './app.js';

const PORT = process.env.PORT || 1338;

const server = http.createServer(app);

const startServer = async () => await server.listen(PORT, () => console.log(`Server up and running at http://localhost:${PORT}`));

startServer();