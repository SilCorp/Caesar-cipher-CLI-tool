import {parameters} from "./src/paramsValidation.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from "path";
import * as stream from "stream"
import {createTransformStream} from "./src/createCipherTransformStream.js";
import {createReadStream} from "./src/createReadStream.js";
import {createWriteStream} from "./src/createWriteStream.js";
import {promisify} from "util";

async function main() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const pipeline = promisify(stream.pipeline)

    const { input, action, shift, output} = parameters
    const inputPath = input ? path.join(__dirname, input) : null
    const outputPath = output ? path.join(__dirname, output) : null

    await pipeline(
        createReadStream(inputPath),
        createTransformStream(action, shift),
        createWriteStream(outputPath),
    )
}

main()
    .then( () => {
        console.log('Pipeline succeeded')
    })
    .catch(err => {
        process.stderr.write(`Error: ${err.message}`)
        process.exit(1)
    })
