var SSE = require('../../node_modules/sse/lib/sse');
var express = require('../../node_modules/express/lib/express');
var cors = require('../../node_modules/cors/lib/');
var SSE = require('../../node_modules/express-sse/');
var sse = new SSE(["array", "containing", "initial", "content", "(optional)"]);

const IP = '127.0.0.1';
const PORT = 8080;

var app = express()
app.use(cors())
app.get('/stream', sse.init);

sse.updateInit(["Hello and welcome"]);

app.listen(PORT, function () {
    console.log('CORS-enabled web server listening on port ' + PORT);
});

var emittedEvents = 0;
setInterval(function () {
    var data = emittedEvents % 2 === 0 ? 'Ping' : 'Pong';
    sse.send(data);
    emittedEvents++;
}, 5000);
