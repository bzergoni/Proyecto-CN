/*
    node-http-proxy
        with websockets from socketio
*/

var util = require('util'),
    colors = require('colors'),

    httpProxy = require('../../lib/node-http-proxy');

//
// Your routes and certificates [untested]
//

var options = {
  //https: {
  //  key: fs.readFileSync('path/to/your/key.pem', 'utf8'),
  //  cert: fs.readFileSync('path/to/your/cert.pem', 'utf8')
  //},
  hostnameOnly: true,
  router: {
    'node.ciudaddelosniños.com': '127.0.0.1:3000'
  }
}

var preProxyServer = httpProxy.createServer(options);
preProxyServer.listen(8000);

//
// Setup our server to proxy standard HTTP requests
//
var proxy = new httpProxy.HttpProxy({
  target: {
    host: 'localhost',
    port: 8080
  }
});
var proxyServer = http.createServer(function (req, res) {
  proxy.proxyRequest(req, res);
});

//
// Listen to the `upgrade` event and proxy the
// WebSocket requests as well.
//
proxyServer.on('upgrade', function (req, socket, head) {
  var buffer = httpProxy.buffer(socket);

  setTimeout(function () {
    proxy.proxyWebSocketRequest(req, socket, head, buffer);
  }, 1000);
});

proxyServer.listen(8001);

//
// Setup the web socket against our proxy
// I don't know what this does.
//
