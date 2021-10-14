import * as fs from "fs";

export function createReadStream(inputPath) {
    if (inputPath) {
        try {
            fs.accessSync(inputPath)
        } catch (err) {
            let errMessage = `Input file does not exist\nFile path: "${inputPath}"`
            throw new Error(errMessage)
        }

        try {
            fs.accessSync(inputPath, fs.constants.R_OK)
        } catch (err) {
            let errMessage = `Read access to the incoming file is denied\nFile path: "${inputPath}"`
            throw new Error(errMessage)
        }

    }
    return inputPath
        ? fs.createReadStream(inputPath)
        : process.stdin
}