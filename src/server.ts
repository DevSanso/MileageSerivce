import app from './app';
import http from 'http';

import * as config from './config/server';


const server = http.createServer(app.callback());
server.listen(config.port,() => {
    console.log(`start server {port :${config.port}}`);
});