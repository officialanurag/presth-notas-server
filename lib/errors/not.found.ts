export const NotFound = (msg: string, channel?: string) => ({
    channel: channel ? channel : 'Error',
    payload: {
        status: 404,
        error: 'Not Found',
        message: msg
    }
})

export const NotFoundPromise = (msg: string, channel?: string) => new Promise(_p => _p({
    channel: channel ? channel : 'Error',
    result: new Promise(__p => __p({
        channel: 'Error',
        payload: {
            status: 404,
            error: 'Not Found',
            message: msg
        }
    }))
}))