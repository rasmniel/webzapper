export default
// abstract
class InputFactory {
    constructor(type) {
        if (new.target === InputFactory)
            throw new Error('Cannot instantiate abstract class InputFactory');

        this.type = type;
        if (!this.type)
            throw new Error('Typeless input factories are not allowed');
    }

    declare(query) {
        const inputs = this.find(query);
        chrome.runtime.sendMessage({
            type: this.type,
            payload: inputs
        });
    }

    // abstract
    find() {
        // Throw error when calling abstract function.
        throw new Error('Find must be implemented by subclasses of InputFactory');
    }
}