var http = require('http');
var fs = require('fs');

function onRequest(request, response) {
  if (request.method == 'GET' && request.url == '/') {
    response.writeHead(200, {'Context-Type' : 'text/html'});
    fs.createReadStream('./project/nodeJs/index.html').pipe(response);
  }
}

http.createServer(onRequest).listen(1245);
console.log('서버가 실행됩니다.');