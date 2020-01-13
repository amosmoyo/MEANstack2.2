const http = require('http');

const server = http.createServer((req,res,next)=>{
  res.end('Hello Amos Moyo');
});

server.listen(process.env.PORT || 4000 );
