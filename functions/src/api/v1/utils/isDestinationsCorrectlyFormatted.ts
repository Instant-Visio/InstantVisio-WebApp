export const isDestinationsCorrectlyFormatted = (
    destinations?: any
): boolean => {
    // noinspection RedundantIfStatementJS
    if (
        !destinations ||
        !Array.isArray(destinations) ||
        destinations.length === 0
    ) {
        return false
    }
    return true
}
