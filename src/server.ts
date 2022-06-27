import app from './app';
import http from 'http';



const server = http.createServer(app.callback());
server.listen(3000);