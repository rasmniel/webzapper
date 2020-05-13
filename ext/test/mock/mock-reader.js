import fs from 'fs';
import path from 'path';

export default
class MockReader {
    constructor() {
        this.mockDir = path.resolve(__dirname) + '/html/';
    }

    async read(file) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.mockDir + file + '.html', 'utf8', (error, fileContent) => {
                if (error) reject(error);
                resolve(fileContent);
            });
        });
    }
}
