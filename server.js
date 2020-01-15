const http = require('http');
const debug = require('debug');
const app = require('./backend/app');

function normalizePort(val){
  let port = parseInt(val, 10);

  if(isNaN(port)){
    return val;
  }

  if(port >= 0){
    return port;
  }

  return false;
}

function onError(err) {
  if(err.syscall !== "listen") {
    throw err;
  }

  const addr = server.address();
  const bind = typeof(addr) === 'string' ? 'pipe' + addr : 'port' + port;

  switch(err.code){
    case 'EACCES':
      console.error(bind + 'Not ready');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + 'ready');
      process.exit(1);
      break;
    default:
      throw err;
  }
}

function onListen(){
  const addr = server.address();
  const bind = typeof(addr) === 'string' ? 'pipe' + addr : 'port' + port;
  debug('Listening on ' + bind);
}

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

const server = http.createServer(app);

server.on('error', onError);
server.on('listening', onListen);
server.listen(port);
