class CodeArray {

    constructor() {
        // Array for holding all active codes.
        this.codes = [];
    }

    generate() {
        // Generate code for user device matching.
        let code;
        do {
            const random = (Math.random() * 9000) + 1000;
            code = random.toFixed();
        } while (this.codes.includes(code));
        // When a unique code has been generated, save and return the code.
        this.codes.push(code);
        return code;
    }

    remove(code) {
        // Remove a code that's no longer in use.
        const codeIndex = this.codes.indexOf(code);
        this.codes.splice(codeIndex, 1);
    }

    count() {
        return this.codes.length;
    }
}

module.exports = exports = new CodeArray();
