const http = require('http');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

http.createServer((req, res) => {
    new Promise(resolve => {
        if (req.url == null || req.url == '/' || req.url == '') {
            filepath = resolve(path.resolve(`dist/index.html`));
        } else {
            fs.exists(path.resolve(`dist${req.url}`), exists => {
                if (exists) {
                    filepath = resolve(path.resolve(`dist${req.url}`));
                } else {
                    filepath = resolve(path.resolve(`dist/index.html`));
                }
            });
        }
    }).then(filepath => {
        fs.readFile(filepath, (err, data) => {
            if (err) return console.log(err);

            res.writeHead(200, {
                'Content-Type': `${mime.lookup(filepath)}; charset=utf-8`,
                'Content-Length': data.length,
                'Transfer-Encoding': 'chunked'
            });

            res.end(data);
        });
    });

}).listen(200);
