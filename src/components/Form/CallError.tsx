export interface Error {
    code: string
    message: string
}

const CallError = (error: Error, t: any) => {
    const e = error
    if (e && e.code) {
        switch (e.code) {
            case 'resource-exhausted':
                return e.message === '402'
                    ? t('errors.quotaSMS')
                    : t('errors.resourceExausted')
            default:
                return t('errors.general')
        }
    }

    return t('errors.general')
}

export default CallError
