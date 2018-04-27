const http = require('http');

const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const walk = require('./walk');
const router = new(require('./router')).Router;

/**
 * Send a file with the right mime type
 * 
 * @param {string} filepath 
 * @param {http.ServerResponse} res 
 */
function provideFile(filepath, res) {
    fs.readFile(filepath, (err, data) => {
        if (!err) {
            res.writeHead(200, {
                'Content-Type': `${mime.lookup(filepath)}; charset=utf-8`,
                'Content-Length': data.length,
                'Transfer-Encoding': 'chunked'
            });

            res.end(data);
        } else {
            res.writeHead(404);
            res.end();
        }
    });
}

http.createServer((req, res) => {
    router.receipt(req, res)
        .handle(["GET"], "/get", params => {
            walk(path.resolve('files'), (err, result) => {
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });

                res.end(JSON.stringify(result));
            });
        })

        .handle(["GET"], "/get/{path*}", params => {
            const filepath = path.resolve(`files${params["path"]}`);

            console.log(filepath);

            fs.stat(filepath, (err, stats) => {
                if (err == null) {
                    if (stats.isDirectory()) {
                        walk(filepath, (err, result) => {
                            res.writeHead(200, {
                                'Content-Type': 'application/json; charset=utf-8'
                            });

                            res.end(JSON.stringify(result));
                        });
                    } else {
                        const valid_extensions = [
                            "txt",
                            "html",
                            "md",
                            "json",
                            "xml",
                            "js",
                            "php"
                        ];

                        if (valid_extensions.indexOf(mime.extension(mime.lookup(filepath))) > -1) {
                            fs.readFile(filepath, (err, data) => {
                                if (!err) {
                                    res.writeHead(200, {
                                        'Content-Type': `application/json; charset=utf-8`,
                                        'Content-Length': data.length,
                                        'Transfer-Encoding': 'chunked'
                                    });

                                    res.end(JSON.stringify({
                                        data: data.toString('utf8')
                                    }));
                                } else {
                                    res.end(JSON.stringify({
                                        error: "Can't load the file."
                                    }));
                                }
                            });
                        } else {
                            res.end(JSON.stringify({
                                error: "Can't load the file."
                            }));
                        }
                    }
                } else {
                    res.end(JSON.stringify({
                        error: "Can't load the file."
                    }));
                }
            });
        });
}).listen(201);