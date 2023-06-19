


export function getFollowerUserSockets(immutable: any, currentUser: any) {
    const keys = Object.keys(immutable)
    const sockets = []
    for (let index = 0; index < keys.length; index++) {
        const element = immutable[index];
        // is my friend
        if (element.user && currentUser.followers.includes(element.user.userId)) {
            sockets.push(keys[index])
        }
    }
    return sockets
}
