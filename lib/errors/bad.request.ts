export const BadRequest = (msg: string, channel?: string) => ({
    channel: 'Error' || channel,
    payload: {
        status: 400,
        error: 'Bad Request',
        message: msg
    }
})