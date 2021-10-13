import {program} from "commander/esm.mjs";
import {Option} from "commander";
import * as fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from "path";
import {pipeline} from "stream"
import {CesarCipherTransform} from "./src/CesarCipherTransform.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

program
    .requiredOption('-s, --shift <shift>', 'a shift')
    .addOption(new Option('-a, --action <action>', 'an action encode/decode').choices(['encode','decode']))
    .option('-i, --input <input>', 'an input file')
    .option('-o, --output <output>', 'an output file')
    .parse()

const { shift, action, input, output } = program.opts()

let readStream = input
    ? fs.createReadStream(path.join(__dirname, input))
    : process.stdin

let writeStream = output
    ? fs.createWriteStream(path.join(__dirname, output), {flags:'a'})
    : process.stdout

let transformStream = new CesarCipherTransform({
    action: action,
    shift: shift,
})

pipeline(
    readStream,
    transformStream,
    writeStream,
    (err) => {
        if (err) {
            console.log('Pipeline failed.', err)
        } else {
            console.log('Pipeline succeeded')
        }
    }
)
