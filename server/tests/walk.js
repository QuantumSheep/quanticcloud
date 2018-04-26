const assert = require('assert');

const walk = require('../src/walk');
const path = require('path');

const expected = [{
        type: 'directory',
        name: 'directory1',
        childs: [{
            type: 'directory',
            name: 'directory1-2',
            childs: [{
                type: 'file',
                name: 'file1-3',
                ext: ''
            }]
        }]
    },
    {
        type: 'directory',
        name: 'directory2',
        childs: [{
            type: 'file',
            name: 'file2-1.txt',
            ext: 'txt'
        }]
    },
    {
        type: 'file',
        name: 'file0',
        ext: ''
    }
];

describe('walk', () => {
    it('should return a list of all directories and files in the files directory', (done) => {
        walk(path.resolve(__dirname, 'walk-files'), (err, result) => {
            try {
                assert.deepEqual(result, expected);
                done();
            } catch (e) {
                done(e);
            }
        });
    });
});