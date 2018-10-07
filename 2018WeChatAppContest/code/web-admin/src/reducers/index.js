import { createStore } from 'redux'
import { sessionState, sessionCounter } from './sessionReducer'
import { notificationState, notificationCounter } from './notificationReducer'

const defaultState = {
    ...sessionState,
    ...notificationState,
}

function counter(state = defaultState, action) {
    const sessionChange = sessionCounter(state, action)
    const notificationChange = notificationCounter(state, action)
    const result =  Object.assign({}, state, {
        ...sessionChange,
        ...notificationChange,
    })
    console.log(action.type, state, action, result)
    return result
}

const store = createStore(counter)

export default store