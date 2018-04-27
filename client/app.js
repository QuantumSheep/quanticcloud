const http = require('http');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

http.createServer((req, res) => {
    new Promise(resolve => {
        if (req.url == null || req.url == '/' || req.url == '') {
            resolve(path.resolve(`dist/index.html`));
        } else {
            fs.exists(path.resolve(`dist${req.url}`), exists => {
                if (exists) {
                    resolve(path.resolve(`dist${req.url}`));
                } else {
                    resolve(path.resolve(`dist/index.html`));
                }
            });
        }
    }).then(filepath => {
        fs.readFile(filepath, (err, data) => {
            if (err) {
                console.log(err);
                return res.end();
            }

            res.writeHead(200, {
                'Content-Type': `${mime.lookup(filepath)}; charset=utf-8`,
                'Content-Length': data.length
            });

            res.end(data);
        });
    });

}).listen(200);
