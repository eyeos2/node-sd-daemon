var http = require('http');

var sd = require('../index.js');

sd.notify('STATUS=starting');

var timer;
var server = http.createServer(function(req, res) {
    console.log(req.method, req.url);
    if (req.url === '/block') {
        var i = 1;
        while (i > 0) i++;

    } else {
        res.end('Hello\n');
    }
});

server.listen(8089, function(error) {
    if (error) {
        console.error('listen', error);

    } else {
        timer = setInterval(function() {
            sd.notify('WATCHDOG=1');
        }, 1000);
        sd.notify('READY=1\nSTATUS=running');
    }
});

process.on('SIGTERM', function() {
    console.log("Stopping");
    clearInterval(timer);
    server.close();
    sd.notify('READY=0\nSTATUS=stopping');
});
