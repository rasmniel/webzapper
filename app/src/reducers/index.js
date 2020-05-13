import {combineReducers} from 'redux';

import slaveReducer from './slave-reducer';
import inputReducer from './input-reducer';
import modalReducer from './modal-reducer';
import feedbackReducer from './feedback-reducer';

export default combineReducers({
    slave: slaveReducer,
    input: inputReducer,
    modal: modalReducer,
    feedback: feedbackReducer,
});