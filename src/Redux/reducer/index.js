import userContext from './user.js'
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    user:userContext
})
export default allReducers;