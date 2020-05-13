const codes = require('../../../src/memory/code-array');

describe('Code array', () => {

    let code;

    beforeAll(() => {
        // Init code and test that codes array can count codes.
        const count = codes.count();
        code = codes.generate();
        // Assert that array length increases by one when generating new code.
        expect(codes.count()).toBe(count + 1);
    });

    it('generates proper code format', () => {
        expect(code.length).toBe(4);
        const codeValue = parseInt(code);
        expect(codeValue).toBeGreaterThan(999);
        expect(codeValue).toBeLessThan(10000);
    });

    afterAll(() => {
        // Remove code.
        const count = codes.count();
        code = codes.remove(code);
        // Assert that array length decreases by one when removing code.
        expect(codes.count()).toBe(count - 1);
    });
});