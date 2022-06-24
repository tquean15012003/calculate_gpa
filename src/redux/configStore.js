import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { NavigateReducer } from './reducers/NavigateReducer.js'
import { CourseReducer } from './reducers/CourseReducer.js'
import { AdminReducer } from './reducers/AdminReducer.js'
import { RequestReducer } from './reducers/RequestReducer.js'

const rootReducer = combineReducers({
    NavigateReducer,
    CourseReducer,
    AdminReducer,
    RequestReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));