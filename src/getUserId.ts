import uuid from 'uuid';

export const getUserId = (): string => {
    const lsUserId = localStorage.getItem('id')
    let userId: string
    if (lsUserId) {
        userId = lsUserId
    } else {
        userId = uuid()
        localStorage.setItem('id', userId)
    }
    return userId
}
