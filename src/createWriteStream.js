import * as fs from "fs";

export function createWriteStream(outputPath) {
    if (outputPath) {
        try {
            fs.accessSync(outputPath)
        } catch (err) {
            let errMessage = `Output file does not exist\nFile path: "${outputPath}"`
            throw new Error(errMessage)
        }

        try {
            fs.accessSync(outputPath, fs.constants.W_OK)
        } catch (err) {
            let errMessage = `Output file write access denied\nFile path: "${outputPath}"`
            throw new Error(errMessage)
        }
    }

    return outputPath
        ? fs.createWriteStream(outputPath, {flags:'a'})
        : process.stdout
}