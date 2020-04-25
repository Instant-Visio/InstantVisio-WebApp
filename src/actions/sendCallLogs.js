export default async (roomName, log) => {

    const { action, ...event } = log

    const roomLogInfo = {
        room: roomName,
        action,
        event
    }

    try {
        await fetch(process.env.REACT_APP_LOG_TRACKING, {
            method: 'POST',
            body: JSON.stringify(roomLogInfo)
        })

    } catch (error) {
        console.log(error)
    }
}
