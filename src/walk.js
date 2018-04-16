const fs = require('fs');
const path = require('path');

/**
 * Recursively walk in a directory
 * 
 * @param {string} dir 
 * @param {(err: NodeJS.ErrnoException, result?: {name: string, type: string, childs: []}[]) => void} callback 
 * @param {number} limit
 */
module.exports = function walk(dir, callback, limit = -1) {
    let result = [];

    fs.readdir(dir, (err, files) => {
        if (err) return callback(err);

        let pending = files.length;

        if (!pending) return callback(null, result);

        for (let i in files) {
            const filepath = path.resolve(dir, files[i]);

            fs.stat(filepath, (err, stats) => {
                if (stats && stats.isDirectory()) {
                    result[i] = {
                        type: "directory",
                        name: files[i],
                        childs: []
                    };

                    walk(filepath, (err, res) => {
                        result[i].childs = result[i].childs.concat(res);

                        if (!--pending) callback(null, result);
                    });
                } else {
                    const fileparts = files[i].split('.');

                    const ext = fileparts.length > 1 ? fileparts[fileparts.length - 1] : "";

                    result.push({
                        type: "file",
                        name: files[i],
                        ext: ext
                    });

                    if (!--pending) callback(null, result);
                }
            });
        }
    });
};