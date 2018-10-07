
export const sessionState = {
    // TODO: 打包前调成 false
    // TODO: 开发时调成 true
    session_login: false,
}

export function sessionCounter(state, action) {
    switch (action.type) {
        case 'app_login': return {
            session_login: true,
        }
        case 'app_logout': return {
            session_login: false,
        }
        default: return {}
    }
}