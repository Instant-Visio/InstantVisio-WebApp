export const hideSupport = () => {
    if (!window.$crisp) return

    window.$crisp.push(['do', 'chat:hide'])
}

export const toggleSupport = () => {
    if (!window.$crisp) return

    if (window.$crisp.is('chat:visible')) {
        window.$crisp.push(['do', 'chat:hide'])
        window.$crisp.push(['do', 'chat:close'])
    } else {
        window.$crisp.push(['do', 'chat:show'])
        window.$crisp.push(['do', 'chat:open'])
    }
}

export const setNewCall = (callData = {}) => {
    if (!window.$crisp) return

    window.$crisp.push([
        'set',
        'session:event',
        [[['videoCallCreated', callData, 'yellow']]],
    ])

    Object.keys(callData).forEach((key) => {
        window.$crisp.push([
            'set',
            'session:data',
            [[[`form-${key}`, callData[key]]]],
        ])
    })
}

export const setNewCallError = (error = {}) => {
    if (!window.$crisp) return
    window.$crisp.push([
        'set',
        'session:event',
        [[['videoCallCreationError', error, 'red']]],
    ])
}

export const setNewCallRedirected = () => {
    if (!window.$crisp) return
    window.$crisp.push([
        'set',
        'session:event',
        [[['videoCallCreatedAndRedirected', null, 'green']]],
    ])
}

export const setVideoCallExited = () => {
    if (!window.$crisp) return
    window.$crisp.push([
        'set',
        'session:event',
        [[['videoCallExited', null, 'orange']]],
    ])
}
