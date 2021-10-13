import {Transform} from 'stream'
import {cesarCipher} from "./cesarCipher.js";


export class CesarCipherTransform extends Transform {
    constructor(options) {
        super(options);
        const {action, shift} = options

        this.action = action
        this.shift = shift
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

