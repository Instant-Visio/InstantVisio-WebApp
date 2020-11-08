export default async (roomName, log) => {
    const { action, ...event } = log

    const roomLogInfo = {
        room: roomName,
        action,
        event,
    }

    const reactAppLogTracking: string | undefined =
        process.env.REACT_APP_LOG_TRACKING
    try {
        if (reactAppLogTracking) {
            await fetch(reactAppLogTracking, {
                method: 'POST',
                body: JSON.stringify(roomLogInfo),
            })
        } else {
            throw new Error('reactAppLogTracking is not set!')
        }
    } catch (error) {
        console.log(error)
    }
}
