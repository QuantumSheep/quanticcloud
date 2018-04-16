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

        files.forEach((file, i) => {
            const filepath = path.resolve(dir, file);
            
            fs.stat(filepath, (err, stats) => {
                if(stats && stats.isDirectory()) {
                    result[i] = {
                        type: "directory",
                        name: file,
                        childs: []
                    };

                    walk(filepath, (err, res) => {
                        result[i].childs = result[i].childs.concat(res);

                        if (!--pending) callback(null, result);
                    });
                } else {
                    const fileparts = file.split('.');

                    result.push({
                        type: "file",
                        name: file,
                        ext: fileparts[fileparts.length - 1]
                    });

                    if (!--pending) callback(null, result);
                }
            });
        });
    });
};