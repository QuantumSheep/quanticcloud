const {
    IncomingMessage,
    ServerResponse
} = require('http');

/**
 * Handle routes
 */
class Router {
    constructor() {
        this.routed = false;
    }

    /**
     * Load the server's and client's data
     * 
     * @param {IncomingMessage} req 
     * @param {ServerResponse} res 
     * @returns {Router}
     */
    receipt(req, res) {
        this.routed = false;
        this.req = req;
        this.res = res;

        return this;
    }

    /**
     * Define a get route
     * 
     * @param {string} path 
     * @param {(result: string[]) => any} callback 
     * @returns {Router}
     */
    handle(methods, path, callback) {
        this.test(methods, path).then(vars => {
            callback(vars);
        }).catch(err => {});

        return this;
    }

    /**
     * Test a route
     * 
     * @param {string[]} methods 
     * @param {string} path 
     * @returns {Promise<boolean|string[]>}
     */
    test(methods, path) {
        return new Promise((resolve, reject) => {
            if (this.routed || methods.indexOf(this.req.method) === -1) {
                return reject(false);
            }

            if (this.req.url == path) {
                return resolve(this.routed = true);
            }

            const parts = path.split('/');

            const client_uri = this.req.url.split('?')[0].split('/');

            if (client_uri[client_uri.length - 1] == "") {
                client_uri = client_uri.splice(--client_uri.length, 1);
            }

            new Promise((resolve, reject) => {
                let vars = [];
                let infinite = false;

                for (let i = 0; i < parts.length; i++) {
                    if (parts[i][0] != null && parts[i][0] == '{') {
                        if (parts[i][parts[i].length - 2] === '*') {
                            const varname = parts[i].replace(/\{(.*?)\*\}/g, "$1");

                            vars[varname] = "";

                            for (let j = i; j < client_uri.length; j++) {
                                vars[varname] += `/${client_uri[j]}`;
                            }

                            infinite = true;

                            return resolve(vars);
                        } else if (client_uri[i] != null) {
                            vars[parts[i].replace(/\{(.*?)\}/g, "$1")] = client_uri[i];
                        } else {
                            return reject(false);
                        }
                    } else if (client_uri[i] == null || parts[i] !== client_uri[i]) {
                        return reject(false);
                    }

                    if (i + 1 === parts.length) {
                        if (!infinite && parts.length < client_uri.length) {
                            reject(false);
                        } else {
                            resolve(vars);
                        }
                    }
                }
            }).then(vars => {
                resolve(vars);
            }).catch(result => {
                reject(result);
            });
        });
    }
}

module.exports = {
    Router
};