import store from '../reducers'

export default function (msg) {
    store.dispatch({
        type: 'app_notification',
        data: {
            message: msg.message
        },
    })
}