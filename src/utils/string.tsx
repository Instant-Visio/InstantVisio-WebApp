// from https://stackoverflow.com/a/7616484/1377145
export const stringHash = (input) => {
    if (!input || input.length === 0) return '0'

    let hash = 0,
        i,
        chr
    for (i = 0; i < input.length; i++) {
        chr = input.charCodeAt(i)
        hash = (hash << 5) - hash + chr
        hash |= 0 // Convert to 32bit integer
    }
    return hash
}
