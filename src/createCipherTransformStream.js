import {Transform} from 'stream'
import {cesarCipher} from "./cesarCipher.js";


export function createTransformStream(action, shift) {
    return new CipherTransformStream({action, shift})
}

class CipherTransformStream extends Transform {
    constructor(options) {
        super(options);

        this.action = options.action
        this.shift = options.shift
    }

    _transform(chunk, encoding, callback) {
        try {
            const result = cesarCipher(chunk.toString(), this.action, this.shift)

            callback(null, result)
        } catch (err) {
            callback(err)
        }
    }
}

