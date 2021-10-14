import {Option} from "commander";
import {program} from "commander/esm.mjs";

try {
    program
        .requiredOption('-s, --shift <shift>', 'a shift')
        .addOption(
            new Option('-a, --action <action>', 'an action encode/decode')
                .choices(['encode','decode'])
                .makeOptionMandatory()
        )
        .option('-i, --input <input>', 'an input file')
        .option('-o, --output <output>', 'an output file')
        .parse()
} catch (err) {
    process.stderr.write(err.message)
    process.exit(1)
}

export const parameters = program.opts()
