/**
 * A simple node server setup to host the application
 * listening port will be generated dynamically.
 * Please look at the console message
 */

var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
    'html': 'text/html',
    'javascript': 'text/javascript',
    'css': 'text/css'
};

var server = http.createServer(function (request, response) {
    var uri = url.parse(request.url).pathname;
    var absUri = path.join(process.cwd(), uri);
    var stats;

    try {
        stats = fs.lstatSync(absUri);
    } catch(e) {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('404 Not Found\n');
        response.end();
        return;
    }

    if(stats.isFile()){
        var mimeType = mimeTypes[path.extname(absUri).split(".").reverse()[0]];
        response.writeHead(200, {'Content-Type': mimeType});

        var fileStram = fs.createReadStream(absUri);
        fileStram.pipe(response);
    } else if(stats.isDirectory()){
        response.writeHead(302, {
            'Location' : 'src/index.html'
        });
        response.end();
    } else {
        response.writeHead(500, {'Content-Type': 'text/plain'});
        response.write('500 Internal Error\n');
        response.end();
    }

});

// Listen to (option 0) a dynamically generated port on localhost
server.listen(0, function () {
   console.log('Server running at http://localhost:'+ server.address().port)
});
