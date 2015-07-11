/* global options */
var http = require('http');
var url = require('url');

var users = [
  { id: '1', name: 'Illya Klymov', phone: '+380504020799', role: 'Administrator' },
  { id: '2', name: 'Ivanov Ivan', phone: '+380670000002', role: 'Student', strikes: 1 },
  { id: '3', name: 'Petrov Petr', phone: '+380670000001', role: 'Support', location: 'Kiev' }
];

function setHeaders(request, response) {
  headersResponse = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  response.writeHead(200, headersResponse);
}
function options(request, response) {
  if (request.method === 'OPTIONS') {
    setHeaders(request, response);
    response.end();
  }
}

var server = http.createServer(function(req, res){

  options(req, res);

  var parseUrl = url.parse(req.url, true);

  if(req.method === 'GET' && parseUrl.pathname === '/api/users'){
    if(req.headers['content-type'] !== 'application/json'){
      res.statusCode = 401;
      res.end('401');
    } else {
      setHeaders(req, res);
      res.end(JSON.stringify(users));
    }
  } else if (req.method === 'GET' && parseUrl.pathname === '/refreshAdmins') {
    setHeaders(req, res);
    res.end();
  }
  if(req.method === 'PUT') {
    res.statusCode = 401;
    res.end('401');
    //if (req.headers['content-type'] !== 'application/json') {
    //}
  }
  if ( req.method === 'DELETE'){
    var id = (path.basename(url.parse(req.url).pathname)).toString();
    if (id.indexOf(users)){

    } else {
      res.end('401');
    }
  }
});

if (module.parent) { module.exports = server } else {
  server.listen(20007);
}



