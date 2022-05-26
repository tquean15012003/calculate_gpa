import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import { NavigateReducer } from './reducers/NavigateReducer.js'

const rootReducer = combineReducers({
    NavigateReducer
});

export const store = createStore(rootReducer,applyMiddleware(thunk));