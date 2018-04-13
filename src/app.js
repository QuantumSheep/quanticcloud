const http = require('http');
const fs = require('fs');
const path = require('path');

const assets = [
    "/assets/css/style.css",
    "/assets/js/explorer.js"
];

http.createServer((req, res) => {
    if (assets.indexOf(req.url) > -1) {
        fs.readFile(path.resolve(`.${req.url}`), (err, data) => {
            res.writeHead(200, {
                'Content-Type': 'text/css',
                'Content-Length': data.length
            });
            res.write(data)
            res.end();
        });
    } else {
        fs.readFile("views/explorer.html", (err, data) => {
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'Content-Length': data.length
            });
            res.write(data)
            res.end();
        });
    }
}).listen(600);