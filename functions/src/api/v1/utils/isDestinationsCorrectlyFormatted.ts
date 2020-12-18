export const isDestinationsCorrectlyFormatted = (
    destinations?: any
): boolean => {
    return Array.isArray(destinations) && destinations?.length > 0
}
