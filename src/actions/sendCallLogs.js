export default async (roomName, log) => {

    const logWithoutAction = () => {
        delete log.action
        return log
    }

    const roomLogInfo = {
        room: roomName,
        action: log.action,
        event: logWithoutAction()
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
