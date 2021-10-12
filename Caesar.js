import {program} from "commander/esm.mjs";
import {Option} from "commander";
import * as fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from "path";
import {pipeline} from "stream"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

program
    .requiredOption('-s, --shift <shift>', 'a shift')
    .addOption(new Option('-a, --action <action>', 'an action encode/decode').choices(['encode','decode']))
    .requiredOption('-a, --action <encode|decode>', 'an action encode/decode')
    .option('-i, --input <input>', 'an input file')
    .option('-o, --output <output>', 'an output file')
    .parse()


const options = program.opts();

let readStream = fs.createReadStream(__dirname + '/input.txt');
let writeStream = fs.createWriteStream(__dirname + '/output.txt', {flags:'a'});

pipeline(
    readStream,
    writeStream,
    (err) => {
        if (err) {
            console.log('Pipeline failed.', err)
        } else {
            console.log('Pipeline succeeded')

        }
    }
)


// console.log(path.join(__dirname, 'input.txt'))

