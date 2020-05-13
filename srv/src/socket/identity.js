// Entity class for holding a socket identity before verifying the connecting.
class Identity {
    constructor(fingerprint, ip, userAgent) {
        this.id = fingerprint;
        this.ip = ip;
        this.ua = userAgent;
    }
}

module.exports = exports = Identity;