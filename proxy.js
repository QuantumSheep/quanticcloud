const httpProxy = require('http-proxy');
const http = require('http');

const proxy = httpProxy.createProxyServer({});

http.createServer((req, res) => {
    if (req.url.startsWith("/api")) {
        req.url = req.url.replace(/^(\/api)/gi, '');
        proxy.web(req, res, {
            target: `http://localhost:201`
        });
    } else {
        proxy.web(req, res, {
            target: `http://localhost:200`
        });
    }
}).listen(100);