import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { NavigateReducer } from './reducers/NavigateReducer.js'
import { CourseReducer } from './reducers/CourseReducer.js'

const rootReducer = combineReducers({
    NavigateReducer,
    CourseReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));