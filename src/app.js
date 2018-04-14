const http = require('http');
const fs = require('fs');
const path = require('path');
const fileType = require('file-type');

const walk = require('./walk');
const router = new(require('./router')).Router;

http.createServer((req, res) => {
    router.receipt(req, res)
        .handle(['GET'], '/assets/{asset*}', params => {
            fs.readFile(path.resolve(`assets/${params["asset"]}`), (err, data) => {
                if (!err) {
                    res.writeHead(200, {
                        'Content-Type': `${fileType(data)}; charset=utf-8`,
                        'Content-Length': data.length
                    });

                    res.write(data);
                } else {
                    res.writeHead(404);

                    res.write("404 Error");
                }

                res.end();
            });
        })
        .handle(["GET"], "/", params => {
            res.write("Home");

            res.end();
        })
        .handle(["GET"], "/explorer", params => {
            fs.readFile(path.resolve(`views/explorer.html`), (err, data) => {
                if (!err) {
                    res.writeHead(200, {
                        'Content-Type': 'text/html; charset=utf-8',
                        'Content-Length': data.length
                    });

                    res.write(data);
                    res.end();
                } else {
                    res.writeHead(404);

                    res.write("404 Error");
                    res.end();
                }
            });
        })
        .handle(["GET"], "/filetree", params => {
            fs.readFile(path.resolve(`views/filetree.html`), (err, data) => {
                if (!err) {
                    res.writeHead(200, {
                        'Content-Type': 'text/html; charset=utf-8',
                        'Content-Length': data.length
                    });

                    res.write(data);
                    res.end();
                } else {
                    res.writeHead(404);
                    res.end();
                }
            });
        })
        .handle(["GET"], "/get/{id}", params => {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });

            walk(path.resolve('files'), (err, result) => {
                res.write(JSON.stringify(result));
    
                res.end();
            });
        });
}).listen(600);