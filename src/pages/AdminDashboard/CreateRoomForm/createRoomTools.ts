import { parsePhoneNumber } from 'libphonenumber-js'
import { UNITS } from '../Reminders/NotificationSelector'

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

    return startAt - remindBeforeTimestampSecs
}

export const validateEmail = (email) => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regexp.test(email)
}

export const validatePhoneNumber = (phoneNumber) => {
    let isValid = true

    try {
        parsePhoneNumber(phoneNumber, 'FR')
    } catch (error) {
        isValid = false
    }

    return isValid
}

export const isParticipantValid = (participant) => {
    return validateEmail(participant) || validatePhoneNumber(participant)
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
            return { phone: destination }
        } else {
            return { groupId: destination }
        }
    })
}
