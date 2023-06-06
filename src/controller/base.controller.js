const fs = require('fs');

class BaseController {
    static async readFileData(filePath) {
        return new Promise ((resolve, reject) => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }
    static async writeFileData(filePath, data) {
        return new Promise ((resolve, reject) => {
            fs.writeFile(filePath, data, 'utf-8', (err) => {
                if (err) reject(err);
                resolve();
            })
        })
    }
}

module.exports = BaseController;