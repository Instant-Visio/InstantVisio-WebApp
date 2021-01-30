import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { UNITS } from '../Reminders/NotificationSelector'
import { Group } from '../groupsSelector'

export const mapDestinationsToInputField = (destinations) => {
    const values = [] as any
    for (const destination of destinations) {
        const [value] = Object.values(destination)
        values.push(value)
    }

    return values
}

export const getRemindAt = (startAt, notification) => {
    let remindBeforeTimestampSecs = 0
    switch (notification.unit) {
        case UNITS.mins:
            remindBeforeTimestampSecs = notification.number * 60
            break
        case UNITS.hours:
            remindBeforeTimestampSecs = notification.number * 60 * 60
            break
        case UNITS.days:
            remindBeforeTimestampSecs = notification.number * 60 * 60 * 24
            break
    }

    const remindAt = startAt - remindBeforeTimestampSecs
    return remindAt > 0 ? remindAt : 0
}

export const validateEmail = (email: string): boolean => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regexp.test(email)
}

export const validatePhoneNumber = (phoneNumber: string): boolean => {
    let isValid = true

    try {
        const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, 'FR')
        if (!parsedPhoneNumber) {
            throw new Error('Phone number not valid')
        }
    } catch (error) {
        isValid = false
    }

    return isValid
}

export const validateGroupName = (
    groupName: string,
    groups: Array<Group>
): boolean => {
    const groupFound = groups.find((group) => group.name === groupName)
    return groupFound !== undefined
}

export const isParticipantValid = (
    participant: string,
    groups: Array<Group>
): boolean => {
    return (
        validateEmail(participant) ||
        validatePhoneNumber(participant) ||
        validateGroupName(participant, groups)
    )
}

export const isNumeric = (destination) => {
    for (let char of destination) {
        if (char >= '0' && char <= '9') continue
        else return false
    }

    return true
}

export const formatDestinations = (destinations) => {
    return destinations.map((destination) => {
        if (destination.includes('@')) {
            return { email: destination }
        } else if (isNumeric(destination)) {
            const parsedPhoneNumber = parsePhoneNumberFromString(
                destination,
                'FR'
            )
            if (parsedPhoneNumber) {
                return {
                    phone: parsedPhoneNumber.formatInternational(),
                }
            }
            return { phone: destination }
        } else {
            return { groupId: destination }
        }
    })
}
