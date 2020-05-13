export default
class HashCache {

    constructor() {
        this.map = {};
    }

    hashCheck({type, payload}) {
        // Hash payload and compare to previous payload if any.
        const hash = this.hashCode(JSON.stringify(payload));
        if (this.map[type] && this.map[type] === hash)
            return false;
        // If the hashes didn't match, assign new hash value.
        this.map[type] = hash;
        // console.log(type, hash, payload);
        return true;
    }

    hashCode(string) {
        let hash = 0;
        if (!string.length)
            return hash;
        // Use chars in string to modify hash arbitrarily.
        for (let i = 0; i < string.length; i++) {
            const charCode = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + charCode;
            // Convert to 32bit integer
            hash &= hash;
        }
        return hash;
    }
}
