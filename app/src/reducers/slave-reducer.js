import * as Types from '../types/slave-types';

const INITIAL_STATE = {
    slaveCode: '',
    hasSlave: false,
    requestSlaveLoading: false,
    slaveError: ''
};

export default (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {

        case Types.SET_SLAVE_CODE:
            return {...state, slaveCode: payload};

        case Types.REQUEST_SLAVE_START:
            return {...state, requestSlaveLoading: true, slaveError: ''};
        case Types.REQUEST_SLAVE_SUCCESS:
            return {...state, requestSlaveLoading: false, masterHasSlave: true, slaveError: ''};
        case Types.REQUEST_SLAVE_ERROR:
        case Types.SLAVE_ERROR:
            return {...state, requestSlaveLoading: false, masterHasSlave: false, slaveError: payload};

        default:
            return state;
    }
};