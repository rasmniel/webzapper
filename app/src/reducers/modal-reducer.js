import * as Types from '../types/modal-types';

const INITIAL_STATE = {
    showModal: false
};

export default (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {

        case Types.OPEN_MODAL:
            return {...state, showModal: true};
        case Types.CLOSE_MODAL:
            return {...state, showModal: false};

        default:
            return state;
    }
};
