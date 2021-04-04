class errorExpress extends Error {
    constructor(msg, code) {
        super();
        this.msg = msg;
        this.code = code;
        console.error(this.stack);
    }
}


module.exports = errorExpress;