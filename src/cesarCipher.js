const ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',]

export function cesarCipher(input = '', action, shift = 0) {
    // Validation
    const ENCODE_TYPE = 'encode'
    const DECODE_TYPE = 'decode'

    if (action !== ENCODE_TYPE && action !== DECODE_TYPE) {
        throw new Error('Unknown action')
    }

    shift = Number(shift)
    if (!Number.isInteger(shift)) {
        throw new Error('The shift must be an integer')
    }

    if (!input.length) return ''

    const ALPHABET_LENGTH = ALPHABET.length
    const isEncodeAction = action === ENCODE_TYPE

    let result = ''

    for (let i = 0; i < input.length; i++) {
        let char = input[i]

        let charIndex = ALPHABET.indexOf(char.toLowerCase())

        if (charIndex < 0) {
            result += char
            continue
        }

        let newCharIndex = (
            isEncodeAction
                ? (charIndex + shift)
                : (charIndex - shift)
            )
            % ALPHABET_LENGTH

        if (newCharIndex < 0) {
           newCharIndex = ALPHABET_LENGTH + newCharIndex
        }

        let newChar = ALPHABET[newCharIndex]

        if (!isLowerCase(char)) {
            newChar = newChar.toUpperCase()
        }

        result += newChar
    }

    return result
}

function isLowerCase(char) {
    return char === char.toLowerCase() && char !== char.toUpperCase()
}
